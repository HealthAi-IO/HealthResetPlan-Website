# HealthResetPlan-Website

> 健康重启计划官网（含 Web 端入口）。

## 技术栈

- Vue 3 + `<script setup>` + TypeScript
- Vite 6
- Pinia
- Vue Router 4

## 本地开发

```bash
npm install
npm run dev
```

访问 <http://localhost:5173>。

## 构建

```bash
npm run build
```

构建产物在 `dist/`，由 Nginx 等静态托管。

## 接入 Web 客户端（可选）

把 Flutter Web 构建产物（`flutter build web --release` 后 `HealthResetPlan/build/web/`）复制到 `public/app/`。访问 `/app/` 即可打开。

## 页面

- `/` 首页
- `/features` 功能介绍
- `/privacy` 隐私 & 端到端加密
- `/terms` 用户协议
- `/download` 下载
- `/app` Web 端入口

## 文档

[`/docs/10-官网开发`](../docs/10-官网开发)。
