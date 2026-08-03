import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "data", "pipeline.js");
const jsonFile = path.join(root, "data", "pipeline.json");

function parseArgs(argv) {
  const args = {
    message: "",
    file: "",
    date: "",
    replace: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--message") args.message = argv[++i] || "";
    if (arg === "--file") args.file = argv[++i] || "";
    if (arg === "--date") args.date = argv[++i] || "";
    if (arg === "--replace") args.replace = true;
  }

  return args;
}

function readData() {
  const code = readFileSync(dataFile, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: dataFile });
  return sandbox.window.PROTAC_PIPELINE_DATA;
}

function writeData(data) {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  const js = `/* PROTAC 全球研发管线追踪：由 scripts/update-data.mjs 维护，也可手动编辑。 */
(function (g) {
  g.PROTAC_PIPELINE_DATA = ${JSON.stringify(data, null, 2)};
})(typeof window !== "undefined" ? window : globalThis);
`;
  writeFileSync(dataFile, js);
  writeFileSync(jsonFile, json);
}

function today() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function nowISO() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = pad(Math.floor(Math.abs(offset) / 60));
  const minutes = pad(Math.abs(offset) % 60);
  return `${today()}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${sign}${hours}:${minutes}`;
}

function mergeEntry(data, imported) {
  const index = data.pipeline.findIndex((item) => item.id === imported.id);
  const merged = {
    ...(index >= 0 ? data.pipeline[index] : {}),
    ...imported,
    lastUpdated: imported.lastUpdated || today()
  };

  if (index >= 0) {
    data.pipeline[index] = merged;
  } else {
    data.pipeline.push(merged);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = readData();
  const date = args.date || today();

  if (args.replace && args.file) {
    const imported = require(path.resolve(root, args.file));
    if (!Array.isArray(imported.pipeline)) {
      throw new Error("导入文件必须包含 pipeline 数组");
    }
    data.pipeline = imported.pipeline.map((item) => ({
      ...item,
      lastUpdated: item.lastUpdated || date
    }));
    data.meta.updateLog.push({
      date,
      type: "replace",
      description: `整体替换管线数据：${imported.pipeline.length} 条`
    });
  } else if (args.file) {
    const imported = require(path.resolve(root, args.file));
    const list = Array.isArray(imported.pipeline) ? imported.pipeline : Array.isArray(imported) ? imported : [];
    list.forEach((item) => {
      if (!item.id || !item.code) return;
      mergeEntry(data, item);
    });
    data.meta.updateLog.push({
      date,
      type: "merge",
      description: `合并更新 ${list.length} 条管线记录`
    });
  } else {
    data.meta.updateLog.push({
      date,
      type: "daily",
      description: args.message || "每日例行检查"
    });
  }

  data.meta.updatedAt = nowISO();
  data.meta.lastChecked = date;

  writeData(data);
  console.log(`已更新 ${dataFile}`);
  console.log(`管线总数：${data.pipeline.length}`);
  console.log(`最后检查：${data.meta.lastChecked}`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
