(function () {
  "use strict";

  const STORAGE_KEY = "protacTracker.v1";
  const DEFAULT_STATE = { version: 1, entries: {}, deletedIds: [], logs: [], meta: {} };

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  const ICONS = {
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>'
  };

  const PHASE_ORDER = {
    "临床前": 1,
    "Phase 1": 2,
    "Phase 1/2": 3,
    "Phase 2": 4,
    "Phase 2/3": 5,
    "Phase 3": 6,
    "已上市": 7,
    "已终止": 8
  };

  const UPDATE_TYPE_LABELS = {
    initial: "初始数据",
    daily: "例行检查",
    "daily-check": "例行检查",
    "manual-add": "手动新增",
    "manual-edit": "手动编辑",
    "manual-delete": "手动删除",
    import: "导入数据",
    merge: "数据合并",
    replace: "数据替换"
  };
  const CHANGE_TYPES = new Set([
    "manual-add",
    "manual-edit",
    "manual-delete",
    "import",
    "merge",
    "replace",
    "initial"
  ]);

  const LIFECYCLE_COLORS = {
    "研发": "var(--blue)",
    "开发": "var(--teal)",
    "商业化": "var(--green)",
    "终止": "var(--red)"
  };

  const baseData = window.PROTAC_PIPELINE_DATA || {
    meta: {
      name: "PROTAC 全球研发管线追踪",
      updatedAt: "",
      lastChecked: "",
      schedule: "每日更新一次或手动更新",
      source: "数据源缺失",
      disclaimer: "",
      updateLog: []
    },
    pipeline: []
  };

  const state = {
    baseData,
    overrides: loadState(),
    filters: {
      search: "",
      lifecycle: "all",
      phase: "all",
      region: "all",
      company: "all"
    },
    editId: null,
    toastTimer: null
  };

  function $id(id) {
    return document.getElementById(id);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_STATE);
      return { ...clone(DEFAULT_STATE), ...JSON.parse(raw) };
    } catch (error) {
      console.warn("无法读取本地修改，已使用默认数据。", error);
      return clone(DEFAULT_STATE);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.overrides));
    } catch (error) {
      console.warn("无法保存本地修改。", error);
      toast("浏览器未允许保存本地修改");
    }
  }

  function currentData() {
    const deleted = new Set(state.overrides.deletedIds || []);
    const pipeline = (state.baseData.pipeline || []).filter((item) => !deleted.has(item.id));
    const overrideEntries = Object.values(state.overrides.entries || {});

    overrideEntries.forEach((entry) => {
      const index = pipeline.findIndex((item) => item.id === entry.id);
      if (index >= 0) {
        pipeline[index] = entry;
      } else {
        pipeline.push(entry);
      }
    });

    const meta = {
      ...state.baseData.meta,
      ...state.overrides.meta,
      updateLog: [
        ...(state.baseData.meta.updateLog || []),
        ...(state.overrides.logs || [])
      ]
    };

    return { meta, pipeline };
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function todayISO() {
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
    return `${todayISO()}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${sign}${hours}:${minutes}`;
  }

  function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  function updateTypeLabel(type) {
    return UPDATE_TYPE_LABELS[type] || type || "更新";
  }

  function logHasChanges(log) {
    if (typeof log.changed === "boolean") return log.changed;
    return CHANGE_TYPES.has(log.type || "");
  }

  function formatDateTime(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const pad = (num) => String(num).padStart(2, "0");
    return formatDate(value) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function slugify(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function icon(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  function countBy(list, key) {
    return list.reduce((acc, item) => {
      const value = item[key] || "未分类";
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  function toast(message) {
    const node = $id("toast");
    node.textContent = message;
    node.classList.add("visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      node.classList.remove("visible");
    }, 2600);
  }

  function renderAll() {
    const data = currentData();
    renderMeta(data);
    renderLatestUpdate(data);
    renderMetrics(data);
    renderLifecycleButtons(data);
    renderLifecycleChart(data);
    renderPhaseChart(data);
    renderRegionChart(data);
    renderTargetChart(data);
    renderMilestones(data);
    renderTable(data);
    renderUpdateLog(data);
    renderUpdaterList(data);
  }

  function renderMeta(data) {
    const meta = data.meta || {};
    $id("sourceNote").textContent = `${meta.source || ""}；${meta.disclaimer || ""}`;
    $id("footerDate").textContent = `数据版本 ${meta.version || formatDate(meta.updatedAt)}`;

    const chip = $id("dataStatusChip");
    const lastChecked = meta.lastChecked || "";
    if (lastChecked >= todayISO()) {
      chip.textContent = `今日已检查 · ${formatDate(lastChecked)}`;
      chip.classList.remove("stale", "warning");
    } else {
      chip.textContent = `今日待检查 · ${formatDate(lastChecked)}`;
      chip.classList.add("stale");
      chip.classList.remove("warning");
    }
  }

  function renderLatestUpdate(data) {
    const logs = (data.meta.updateLog || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    const today = todayISO();
    const todayLog = logs.find(function (log) {
      return (log.date || "") === today;
    });
    const latest = logs[0] || null;
    const panel = $id("latestUpdatePanel");
    const title = $id("latestUpdateTitle");
    const meta = $id("latestUpdateMeta");
    const badge = $id("latestUpdateBadge");

    panel.classList.remove("has-change", "check-only", "no-update");

    if (!logs.length) {
      panel.classList.add("no-update");
      title.textContent = "今日暂无更新";
      badge.textContent = "待更新";
      meta.textContent = "尚未生成更新记录";
      return;
    }

    if (todayLog) {
      const changed = logHasChanges(todayLog);
      panel.classList.add(changed ? "has-change" : "check-only");
      title.textContent = changed
        ? "今日更新：" + (todayLog.description || "数据已更新")
        : "今日已检查：无管线数据更新";
      badge.textContent = changed ? "有更新" : "例行检查";
      const detail = changed
        ? todayLog.description || "数据已更新"
        : todayLog.description || "例行检查完成";
      meta.textContent = todayLog.date + " · " + updateTypeLabel(todayLog.type) + " · " + detail + " · " + formatDateTime(todayLog.updatedAt || data.meta.updatedAt);
      return;
    }

    panel.classList.add("no-update");
    title.textContent = "今日暂无更新";
    badge.textContent = "待更新";
    meta.textContent = latest
      ? "上次更新：" + latest.date + " · " + updateTypeLabel(latest.type) + " · " + formatDateTime(latest.updatedAt || data.meta.updatedAt)
      : "尚未生成更新记录";
  }

  function renderMetrics(data) {
    const pipeline = data.pipeline;
    const active = pipeline.filter((item) => item.lifecycle !== "终止" && item.status !== "已终止");
    const clinical = active.filter((item) => {
      const phase = item.phase || "";
      return phase !== "临床前" && phase !== "已上市" && phase !== "";
    });
    const commercial = pipeline.filter((item) => item.lifecycle === "商业化" || item.phase === "已上市");
    const targets = new Set(pipeline.map((item) => item.target || "").filter(Boolean));

    const cards = [
      { label: "收录管线", value: pipeline.length, sub: `${active.length} 条仍在推进`, color: "var(--teal)" },
      { label: "临床阶段项目", value: clinical.length, sub: "Phase 1 至 Phase 3", color: "var(--blue)" },
      { label: "已上市 / 商业化", value: commercial.length, sub: "含已上市与商业化状态", color: "var(--green)" },
      { label: "覆盖靶点", value: targets.size, sub: "来自当前本地数据库", color: "var(--amber)" }
    ];

    $id("metricsGrid").innerHTML = cards.map((card) => `
      <article class="metric-card" style="--metric-color:${card.color}">
        <span class="metric-label">${escapeHtml(card.label)}</span>
        <strong class="metric-value">${card.value}</strong>
        <span class="metric-sub">${escapeHtml(card.sub)}</span>
      </article>
    `).join("");
  }

  function renderLifecycleButtons(data) {
    const counts = countBy(data.pipeline, "lifecycle");
    const labels = ["研发", "开发", "商业化", "终止"];
    $id("lifecycleButtons").innerHTML = labels.map((label) => `
      <button class="overview-filter ${state.filters.lifecycle === label ? "active" : ""}" data-lifecycle="${label}" type="button">
        ${label} · ${counts[label] || 0}
      </button>
    `).join("");

    document.querySelectorAll("[data-lifecycle]").forEach((button) => {
      button.addEventListener("click", () => {
        state.filters.lifecycle = state.filters.lifecycle === button.dataset.lifecycle ? "all" : button.dataset.lifecycle;
        $id("filterLifecycle").value = state.filters.lifecycle;
        renderAll();
        document.querySelector(".table-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderLifecycleChart(data) {
    const counts = countBy(data.pipeline, "lifecycle");
    const labels = ["研发", "开发", "商业化", "终止"];
    const max = Math.max(1, ...labels.map((label) => counts[label] || 0));

    $id("lifecycleSubtitle").textContent = `共 ${data.pipeline.length} 条管线`;
    $id("lifecycleChart").innerHTML = labels.map((label) => {
      const value = counts[label] || 0;
      const percent = Math.round((value / max) * 100);
      return `
        <div class="bar-row">
          <span class="bar-label">${label}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${percent}%;background:${LIFECYCLE_COLORS[label] || "var(--teal)"}"></span></span>
          <span class="bar-value">${value}</span>
        </div>
      `;
    }).join("");
  }

  function renderPhaseChart(data) {
    const counts = countBy(data.pipeline, "phase");
    const phases = ["临床前", "Phase 1", "Phase 1/2", "Phase 2", "Phase 2/3", "Phase 3", "已上市"];
    const max = Math.max(1, ...phases.map((phase) => counts[phase] || 0));

    $id("phaseSubtitle").textContent = "按当前临床阶段统计";
    $id("phaseChart").innerHTML = phases.map((phase) => {
      const value = counts[phase] || 0;
      const height = Math.max(3, Math.round((value / max) * 140));
      return `
        <div class="phase-column" title="${escapeHtml(phase)}：${value}">
          <div class="phase-bar" style="height:${height}px"></div>
          <span class="phase-value">${value}</span>
          <span class="phase-name">${phase}</span>
        </div>
      `;
    }).join("");
  }

  function renderRegionChart(data) {
    const counts = countBy(data.pipeline, "region");
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const max = Math.max(1, ...sorted.map(([, value]) => value));

    $id("regionChart").innerHTML = sorted.map(([region, value]) => {
      const percent = Math.round((value / max) * 100);
      return `
        <div class="bar-row">
          <span class="bar-label">${escapeHtml(region)}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${percent}%"></span></span>
          <span class="bar-value">${value}</span>
        </div>
      `;
    }).join("") || '<div class="empty-state">暂无地区数据</div>';
  }

  function renderTargetChart(data) {
    const counts = countBy(data.pipeline, "target");
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = Math.max(1, ...sorted.map(([, value]) => value));

    $id("targetChart").innerHTML = sorted.map(([target, value]) => {
      const percent = Math.round((value / max) * 100);
      return `
        <div class="bar-row">
          <span class="bar-label" title="${escapeHtml(target)}">${escapeHtml(target)}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${percent}%;background:linear-gradient(90deg,var(--blue),var(--amber))"></span></span>
          <span class="bar-value">${value}</span>
        </div>
      `;
    }).join("") || '<div class="empty-state">暂无靶点数据</div>';
  }

  function renderMilestones(data) {
    const milestones = data.pipeline.flatMap((item) =>
      (item.milestones || []).map((milestone) => ({
        ...milestone,
        code: item.code,
        company: item.company
      }))
    ).sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))).slice(0, 8);

    $id("milestoneList").innerHTML = milestones.map((item) => `
      <div class="milestone-item">
        <span class="milestone-date">${escapeHtml(item.date || "-")}</span>
        <div class="milestone-title">
          ${escapeHtml(item.title || "")}
          <span class="milestone-source">${escapeHtml(item.code || "")} · ${escapeHtml(item.company || "")}${item.source ? ` · ${escapeHtml(item.source)}` : ""}</span>
        </div>
      </div>
    `).join("") || '<div class="empty-state">暂无里程碑数据</div>';
  }

  function uniqueValues(pipeline, key) {
    return Array.from(new Set(pipeline.map((item) => item[key]).filter(Boolean))).sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  function renderFilterOptions(data) {
    const selectors = [
      ["filterLifecycle", "lifecycle", "全部生命周期"],
      ["filterPhase", "phase", "全部阶段"],
      ["filterRegion", "region", "全部地区"],
      ["filterCompany", "company", "全部企业"]
    ];

    selectors.forEach(([id, key, allLabel]) => {
      const select = $id(id);
      const current = state.filters[key] || "all";
      const values = uniqueValues(data.pipeline, key);
      const options = values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
      select.innerHTML = `<option value="all">${allLabel}</option>${options}`;
      select.value = values.includes(current) ? current : "all";
      state.filters[key] = select.value;
    });
  }

  function matchesFilters(item) {
    const filters = state.filters;
    const haystack = [
      item.code,
      item.aliases ? item.aliases.join(" ") : "",
      item.company,
      item.target,
      item.indication,
      item.notes,
      item.source
    ].join(" ").toLowerCase();

    if (filters.search && !haystack.includes(filters.search.toLowerCase())) return false;
    if (filters.lifecycle !== "all" && item.lifecycle !== filters.lifecycle) return false;
    if (filters.phase !== "all" && item.phase !== filters.phase) return false;
    if (filters.region !== "all" && item.region !== filters.region) return false;
    if (filters.company !== "all" && item.company !== filters.company) return false;
    return true;
  }

  function lifecycleClass(lifecycle) {
    if (lifecycle === "商业化") return "commercial";
    if (lifecycle === "终止") return "terminated";
    return "";
  }

  function renderTable(data) {
    renderFilterOptions(data);

    const rows = data.pipeline
      .filter(matchesFilters)
      .sort((a, b) => {
        const phaseDiff = (PHASE_ORDER[a.phase] || 99) - (PHASE_ORDER[b.phase] || 99);
        if (phaseDiff !== 0) return phaseDiff;
        return String(a.code || "").localeCompare(String(b.code || ""), "zh-CN");
      });

    $id("tableSubtitle").textContent = `筛选结果 ${rows.length} / ${data.pipeline.length} 条`;
    $id("resultCount").textContent = `${rows.length} 条`;

    const tbody = $id("pipelineTableBody");
    tbody.innerHTML = rows.map((item) => {
      const aliases = item.aliases && item.aliases.length ? item.aliases.join(" / ") : "";
      return `
        <tr data-id="${escapeHtml(item.id)}">
          <td>
            <span class="pipeline-code">${escapeHtml(item.code)}</span>
            ${aliases ? `<span class="pipeline-aliases">${escapeHtml(aliases)}</span>` : ""}
          </td>
          <td class="company-cell">${escapeHtml(item.company)}</td>
          <td class="target-cell">${escapeHtml(item.target)}</td>
          <td class="indication-cell">${escapeHtml(item.indication)}</td>
          <td><span class="phase-chip">${escapeHtml(item.phase || "-")}</span></td>
          <td><span class="lifecycle-chip ${lifecycleClass(item.lifecycle)}">${escapeHtml(item.lifecycle || "-")}</span></td>
          <td>${escapeHtml(item.region || "-")}</td>
          <td>${escapeHtml(formatDate(item.lastUpdated))}</td>
          <td>
            <div class="row-actions">
              <button class="icon-button" data-action="edit" data-id="${escapeHtml(item.id)}" aria-label="编辑 ${escapeHtml(item.code)}">${icon("edit")}</button>
              <button class="icon-button" data-action="delete" data-id="${escapeHtml(item.id)}" aria-label="删除 ${escapeHtml(item.code)}">${icon("trash")}</button>
            </div>
          </td>
        </tr>
      `;
    }).join("") || '<tr><td colspan="9"><div class="empty-state">没有符合筛选条件的管线</div></td></tr>';

    tbody.querySelectorAll("tr[data-id]").forEach((row) => {
      row.addEventListener("click", (event) => {
        const actionButton = event.target.closest("[data-action]");
        if (actionButton) return;
        openDetail(row.dataset.id);
      });
    });

    tbody.querySelectorAll("[data-action='edit']").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openEdit(button.dataset.id);
      });
    });

    tbody.querySelectorAll("[data-action='delete']").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteEntry(button.dataset.id);
      });
    });
  }

  function renderUpdateLog(data) {
    const logs = (data.meta.updateLog || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    }).slice(0, 20);
    $id("updateLog").innerHTML = logs.map(function (log) {
      const changed = logHasChanges(log);
      const stateText = changed ? "有更新" : "无数据变更";
      return '<div class="update-item ' + (changed ? "update-changed" : "update-checked") + '">' +
        '<span class="update-date">' + escapeHtml(log.date || "-") + "</span>" +
        '<div class="update-description">' + escapeHtml(log.description || (changed ? "数据已更新" : "例行检查，无数据变更")) +
        '<span class="milestone-source">' + escapeHtml(updateTypeLabel(log.type)) + " · " + stateText + "</span>" +
        "</div></div>";
    }).join("") || '<div class="empty-state">暂无更新记录</div>';
  }
  function renderUpdaterList(data) {
    const pipeline = data.pipeline.slice().sort((a, b) => String(a.code || "").localeCompare(String(b.code || ""), "zh-CN"));
    $id("updaterCount").textContent = `${pipeline.length} 条`;
    $id("updaterList").innerHTML = pipeline.map((item) => `
      <div class="updater-item">
        <div class="updater-item-main">
          <span class="updater-item-code">${escapeHtml(item.code)}</span>
          <span class="updater-item-meta">${escapeHtml(item.company || "")} · ${escapeHtml(item.phase || "")} · ${escapeHtml(item.target || "")}</span>
        </div>
        <div class="updater-item-actions">
          <button class="icon-button" data-edit-id="${escapeHtml(item.id)}" aria-label="编辑 ${escapeHtml(item.code)}">${icon("edit")}</button>
          <button class="icon-button" data-delete-id="${escapeHtml(item.id)}" aria-label="删除 ${escapeHtml(item.code)}">${icon("trash")}</button>
        </div>
      </div>
    `).join("");

    $id("updaterList").querySelectorAll("[data-edit-id]").forEach((button) => {
      button.addEventListener("click", () => openEdit(button.dataset.editId));
    });

    $id("updaterList").querySelectorAll("[data-delete-id]").forEach((button) => {
      button.addEventListener("click", () => deleteEntry(button.dataset.deleteId));
    });
  }

  function openDetail(id) {
    const data = currentData();
    const item = data.pipeline.find((entry) => entry.id === id);
    if (!item) return;

    const aliases = item.aliases && item.aliases.length ? item.aliases.join(" / ") : "";
    const fields = [
      ["企业 / 合作方", item.company],
      ["靶点", item.target],
      ["适应症", item.indication],
      ["技术类型", item.modality],
      ["E3 连接酶", item.e3],
      ["给药方式", item.route],
      ["开发区域", item.region],
      ["状态", item.status],
      ["信息来源", item.source],
      ["最近更新", item.lastUpdated]
    ];

    $id("detailContent").innerHTML = `
      <div class="detail-hero">
        <h2 id="detailTitle">${escapeHtml(item.code)}</h2>
        ${aliases ? `<p class="detail-aliases">${escapeHtml(aliases)}</p>` : ""}
        <div class="detail-tags">
          <span class="phase-chip">${escapeHtml(item.phase || "-")}</span>
          <span class="lifecycle-chip ${lifecycleClass(item.lifecycle)}">${escapeHtml(item.lifecycle || "-")}</span>
        </div>
      </div>
      <div class="detail-grid">
        ${fields.map(([label, value]) => `
          <div class="detail-field">
            <span class="detail-field-label">${escapeHtml(label)}</span>
            <span class="detail-field-value">${escapeHtml(value || "-")}</span>
          </div>
        `).join("")}
      </div>
      <div class="detail-notes">
        <h3>备注</h3>
        <p>${escapeHtml(item.notes || "暂无备注")}</p>
      </div>
      <div class="detail-milestones">
        <h3>里程碑</h3>
        ${(item.milestones || []).map((milestone) => `
          <div class="detail-milestone">
            <strong>${escapeHtml(milestone.date || "-")} · ${escapeHtml(milestone.title || "")}</strong>
            <span>${escapeHtml(milestone.source || "")}</span>
          </div>
        `).join("") || '<p class="empty-state">暂无里程碑</p>'}
      </div>
    `;
    $id("detailModal").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    $id("detailModal").hidden = true;
    document.body.style.overflow = "";
  }

  function milestonesToText(milestones) {
    return (milestones || [])
      .map((item) => [item.date, item.title, item.source].filter(Boolean).join(" | "))
      .join("\n");
  }

  function parseMilestonesText(text) {
    return String(text || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((part) => part.trim());
        return { date: parts[0] || "", title: parts[1] || "", source: parts[2] || "" };
      })
      .filter((item) => item.date && item.title);
  }

  function resetForm() {
    state.editId = null;
    $id("editId").value = "";
    $id("formTitle").textContent = "新增管线";
    $id("candidateForm").reset();
  }

  function openNewCandidate() {
    resetForm();
    $id("updaterDrawer").classList.add("open");
    $id("updaterDrawer").setAttribute("aria-hidden", "false");
    $id("fieldCode").focus();
  }

  function openEdit(id) {
    const data = currentData();
    const item = data.pipeline.find((entry) => entry.id === id);
    if (!item) return;

    state.editId = id;
    $id("editId").value = id;
    $id("formTitle").textContent = `编辑 ${item.code}`;
    $id("fieldCode").value = item.code || "";
    $id("fieldAliases").value = (item.aliases || []).join(", ");
    $id("fieldCompany").value = item.company || "";
    $id("fieldCountry").value = item.country || "";
    $id("fieldTarget").value = item.target || "";
    $id("fieldIndication").value = item.indication || "";
    $id("fieldLifecycle").value = item.lifecycle || "研发";
    $id("fieldPhase").value = item.phase || "Phase 1";
    $id("fieldModality").value = item.modality || "PROTAC";
    $id("fieldE3").value = item.e3 || "";
    $id("fieldRoute").value = item.route || "口服";
    $id("fieldRegion").value = item.region || "";
    $id("fieldStatus").value = item.status || "";
    $id("fieldSource").value = item.source || "";
    $id("fieldNotes").value = item.notes || "";
    $id("fieldMilestones").value = milestonesToText(item.milestones);
    $id("updaterDrawer").classList.add("open");
    $id("updaterDrawer").setAttribute("aria-hidden", "false");
    $id("updaterDrawer").scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeUpdater() {
    $id("updaterDrawer").classList.remove("open");
    $id("updaterDrawer").setAttribute("aria-hidden", "true");
    resetForm();
  }

  function saveCandidate(event) {
    event.preventDefault();
    const data = currentData();
    const code = $id("fieldCode").value.trim();
    if (!code) {
      toast("请填写药物代码");
      $id("fieldCode").focus();
      return;
    }

    const id = state.editId || slugify(code) || `manual-${Date.now()}`;
    const existing = data.pipeline.find((item) => item.id === id);
    const entry = {
      ...(existing || {}),
      id,
      code,
      aliases: $id("fieldAliases").value.split(",").map((item) => item.trim()).filter(Boolean),
      company: $id("fieldCompany").value.trim(),
      country: $id("fieldCountry").value.trim(),
      target: $id("fieldTarget").value.trim(),
      indication: $id("fieldIndication").value.trim(),
      lifecycle: $id("fieldLifecycle").value,
      phase: $id("fieldPhase").value,
      modality: $id("fieldModality").value,
      e3: $id("fieldE3").value.trim() || "未披露",
      route: $id("fieldRoute").value,
      region: $id("fieldRegion").value.trim() || "未披露",
      status: $id("fieldStatus").value.trim() || "活跃",
      source: $id("fieldSource").value.trim() || "手动录入",
      notes: $id("fieldNotes").value.trim(),
      milestones: parseMilestonesText($id("fieldMilestones").value),
      lastUpdated: todayISO()
    };

    state.overrides.entries[id] = entry;
    state.overrides.deletedIds = (state.overrides.deletedIds || []).filter((deletedId) => deletedId !== id);
    state.overrides.meta.lastChecked = todayISO();
    state.overrides.meta.updatedAt = nowISO();
    state.overrides.logs.push({
      date: todayISO(),
      type: state.editId ? "manual-edit" : "manual-add",
      description: `${state.editId ? "编辑" : "新增"}管线：${entry.code}`
    });
    saveState();
    renderAll();
    resetForm();
    toast(`已保存 ${entry.code}`);
  }

  function deleteEntry(id) {
    const data = currentData();
    const item = data.pipeline.find((entry) => entry.id === id);
    if (!item) return;
    if (!window.confirm(`确认从本地视图中删除 ${item.code}？站点默认数据不会被物理删除，可随时重置。`)) return;

    delete state.overrides.entries[id];
    state.overrides.deletedIds = Array.from(new Set([...(state.overrides.deletedIds || []), id]));
    state.overrides.logs.push({
      date: todayISO(),
      type: "manual-delete",
      description: `本地视图删除管线：${item.code}`
    });
    saveState();
    renderAll();
    toast(`已从本地视图删除 ${item.code}`);
  }

  function exportData() {
    const data = currentData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `protac-pipeline-${todayISO()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast("已导出当前数据 JSON");
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        if (!Array.isArray(imported.pipeline)) throw new Error("缺少 pipeline 数组");
        const current = currentData();
        const knownIds = new Set(current.pipeline.map((item) => item.id));

        imported.pipeline.forEach((item) => {
          if (!item.id || !item.code) return;
          state.overrides.entries[item.id] = {
            ...(current.pipeline.find((entry) => entry.id === item.id) || {}),
            ...item,
            lastUpdated: item.lastUpdated || todayISO()
          };
          if (knownIds.has(item.id)) {
            state.overrides.deletedIds = (state.overrides.deletedIds || []).filter((deletedId) => deletedId !== item.id);
          }
        });

        state.overrides.meta.lastChecked = todayISO();
        state.overrides.meta.updatedAt = nowISO();
        state.overrides.logs.push({
          date: todayISO(),
          type: "import",
          description: `导入 JSON：${imported.pipeline.length} 条管线`
        });
        saveState();
        renderAll();
        toast(`已导入 ${imported.pipeline.length} 条管线`);
      } catch (error) {
        console.error(error);
        toast("导入失败，请检查 JSON 格式");
      }
    };
    reader.readAsText(file);
  }

  function resetLocal() {
    if (!window.confirm("确认清除浏览器中的本地修改？站点默认数据会恢复。")) return;
    localStorage.removeItem(STORAGE_KEY);
    state.overrides = clone(DEFAULT_STATE);
    renderAll();
    toast("已清除本地修改");
  }

  function runDailyCheck() {
    state.overrides.meta.lastChecked = todayISO();
    state.overrides.meta.updatedAt = nowISO();
    state.overrides.logs.push({
      date: todayISO(),
      type: "daily-check",
      description: "浏览器端每日例行检查完成，未发现新的本地数据变更"
    });
    saveState();
    renderAll();
    toast(`今日检查完成：${todayISO()}`);
  }

  async function syncServerData() {
    if (window.location.protocol === "file:") return;
    try {
      const response = await fetch(`data/pipeline.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const remote = await response.json();
      if (!remote.meta || !Array.isArray(remote.pipeline)) return;
      const localVersion = state.baseData.meta.updatedAt || "";
      const remoteVersion = remote.meta.updatedAt || "";
      if (remoteVersion > localVersion) {
        state.baseData = remote;
        renderAll();
        toast("已同步服务端数据源");
      }
    } catch (error) {
      // file:// 或未生成 data/pipeline.json 时静默忽略
    }
  }

  function bindEvents() {
    $id("openUpdaterButton").addEventListener("click", openNewCandidate);
    $id("closeUpdaterButton").addEventListener("click", closeUpdater);
    $id("newCandidateButton").addEventListener("click", openNewCandidate);
    $id("cancelEditButton").addEventListener("click", resetForm);
    $id("candidateForm").addEventListener("submit", saveCandidate);
    $id("exportDataButton").addEventListener("click", exportData);
    $id("importDataButton").addEventListener("click", () => $id("importFileInput").click());
    $id("resetLocalButton").addEventListener("click", resetLocal);
    $id("dailyCheckButton").addEventListener("click", runDailyCheck);

    $id("importFileInput").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) importData(file);
      event.target.value = "";
    });

    $id("searchInput").addEventListener("input", (event) => {
      state.filters.search = event.target.value.trim();
      renderTable(currentData());
    });

    [
      ["filterLifecycle", "lifecycle"],
      ["filterPhase", "phase"],
      ["filterRegion", "region"],
      ["filterCompany", "company"]
    ].forEach(([id, key]) => {
      $id(id).addEventListener("change", (event) => {
        state.filters[key] = event.target.value;
        renderTable(currentData());
      });
    });

    $id("resetFiltersButton").addEventListener("click", () => {
      state.filters = { search: "", lifecycle: "all", phase: "all", region: "all", company: "all" };
      $id("searchInput").value = "";
      renderTable(currentData());
    });

    $id("closeDetailButton").addEventListener("click", closeDetail);
    $id("detailModal").addEventListener("click", (event) => {
      if (event.target === $id("detailModal")) closeDetail();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDetail();
        closeUpdater();
      }
    });
  }

  renderAll();
  bindEvents();
  syncServerData();
})();
