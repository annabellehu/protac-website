# PROTAC 全球研发管线追踪

一个无需后端的静态数据看板，用于跟踪全球 PROTAC 药物从研发、开发到商业化的管线进展，并支持每日例行检查和浏览器内手动更新。

## 已部署

- 公开地址：https://annabellehu.github.io/protac-website/
- 仓库：https://github.com/annabellehu/protac-website

## 本地运行

直接双击 `index.html` 即可打开。若希望看到服务端自动同步效果，可运行：

```bash
npm run serve
```

然后访问 `http://localhost:4173`。

## 分享给其他人

### 方式一：GitHub Pages（推荐）

1. 在 GitHub 新建一个公开仓库，例如 `protac-website`。
2. 在项目目录初始化并推送：

```bash
git init
git add .
git commit -m "feat: PROTAC pipeline tracker"
git branch -M main
git remote add origin https://github.com/你的用户名/protac-website.git
git push -u origin main
```

3. 打开仓库 `Settings -> Pages`，在 `Build and deployment` 中选择 `Source: GitHub Actions`。
4. 推送后 `.github/workflows/deploy.yml` 会自动部署，访问地址通常是 `https://你的用户名.github.io/protac-website/`。

现有 `.github/workflows/daily-update.yml` 每天更新数据并提交后，也会自动触发 Pages 重新部署。

### 方式二：Netlify Drop

打开 `https://app.netlify.com/drop`，直接把整个 `protac-website` 文件夹拖进页面，即可获得一个公开链接。

### 方式三：Vercel

```bash
npx vercel
```

登录 Vercel 后按提示选择项目根目录，Vercel 会识别静态站点并生成公开 URL。

### 方式四：局域网临时分享

先运行：

```bash
npm run serve
```

再让同一网络下的设备访问你的局域网 IP 加端口 `4173`。可用 `hostname -I` 查看 IP，例如 `http://192.168.1.10:4173`。

## 数据与更新方式

默认数据在 `data/pipeline.js`，字段说明见下。站内“手动更新”面板会把修改保存到浏览器 `localStorage`，可导出 JSON；要让修改成为部署环境的默认数据，请提交导出的 JSON 或直接编辑 `data/pipeline.js`。

### 手动更新

```bash
node scripts/update-data.mjs --file update.json --message "手动更新管线"
```

`update.json` 可以只包含待合并管线数组，也可以包含完整 `{ meta, pipeline }` 结构。相同 `id` 会覆盖，新 `id` 会追加。

整体替换数据：

```bash
node scripts/update-data.mjs --file full.json --replace --message "整体更新"
```

### 每日例行检查

```bash
npm run daily
```

该命令会更新 `updatedAt`、`lastChecked`，并把一条检查记录写入 `data/pipeline.js`。项目同时提供 `.github/workflows/daily-update.yml`，可每天定时执行并自动提交，适合部署在 GitHub Pages 等静态托管。

## 数据字段

- `id`：唯一标识
- `code`：药物代码或通用名
- `aliases`：别名数组
- `company`：企业或合作方
- `target`：作用靶点
- `indication`：适应症
- `lifecycle`：研发 / 开发 / 商业化 / 终止
- `phase`：临床前、Phase 1、Phase 1/2、Phase 2、Phase 2/3、Phase 3、已上市
- `modality`：PROTAC、分子胶降解剂、BiDAC 等
- `e3`：E3 连接酶，未披露可留空
- `route`：给药方式
- `region`：开发地区
- `status`：活跃、计划进入临床、已终止等
- `source`：信息来源
- `notes`：备注
- `milestones`：`[{ date, title, source }]`
- `lastUpdated`：最近更新日期

## 重要说明

种子数据来自公开资料汇编，包含企业公告、会议摘要和公开检索结果。实际研发状态变化很快，请以企业官方公告、监管机构和临床试验登记平台为准。
