# COC 调查员车卡工具

一个面向《克苏鲁的呼唤》第七版（Call of Cthulhu 7th Edition）的在线人物卡（调查员卡）制作工具，采用现代化 Material Design 界面。纯前端、数据本地保存，可一键部署到 GitHub Pages。

## ✨ 功能

- **基础信息**：姓名、玩家、职业、年龄、性别、居住地、故乡，支持随机姓名生成与头像上传
- **属性投掷**：一键按 7 版规则投掷九大属性（3D6×5 / (2D6+6)×5），并可按年龄自动调整
- **衍生属性**：自动计算 HP / MP / SAN、伤害加值 DB、体格 Build、移动力 MOV
- **技能系统**：完整的 7 版技能表（含母语、外语、格斗、射击、科学、技艺、驾驶等专攻类技能），
  职业点 / 兴趣点 / 成长点分别计算，实时统计点数池、合计、半值与五分之一值
- **职业模板**：内置 20+ 常见职业，按公式一键计算职业技能点
- **武器表**：可自由增删武器条目
- **背景故事**：7 版完整背景设定（信念、重要之人、宝贵之物、特质、恐惧症等）
- **资产 / 关系 / 经历**
- **骰子工具**：支持 `2D6+3` 等表达式与常用预设
- **存档**：自动保存到浏览器本地；支持导出 / 导入 JSON 存档
- **导出图片**：一键将整张人物卡导出为 PNG

## 🛠 技术栈

React 18 · TypeScript · Vite · Material UI (MUI) · html-to-image

## 🚀 本地运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建，输出到 dist/
npm run preview  # 预览生产构建
```

## 📦 部署到 GitHub Pages

本仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），构建使用相对路径
（`vite.config.ts` 中 `base: './'`），因此无需关心仓库名。

1. 将本项目推送到 GitHub 仓库的 `main` 分支。
2. 打开仓库 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
3. 之后每次推送到 `main` 都会自动构建并发布，站点地址形如
   `https://<用户名>.github.io/<仓库名>/`。

> 也可以手动部署：`npm run build` 后执行 `npm run deploy`（使用 `gh-pages` 包推送到 `gh-pages` 分支）。

## 📄 说明

本工具为爱好者自制的非官方辅助工具，《克苏鲁的呼唤》（Call of Cthulhu）及相关规则版权归
Chaosium Inc. 所有。
