# Pixel Forum

一個面向 LGBTQA+ 群體的復古風格社區論壇，採用 8-bit 像素藝術設計。

## 技術棧

### 前端
- React 18 + TypeScript
- Next.js 14
- Tailwind CSS
- Zustand (狀態管理)
- Supabase (認證和存儲)

### 後端
- NestJS
- TypeORM
- PostgreSQL
- Redis
- Supabase
- Cloudflare R2

## 特色功能

- 8-bit 風格頭像生成器
  - Canvas 原生 API
  - 像素級繪圖
  - 實時預覽
- 自定義像素名牌
- 街機按鈕風格的板塊分類
- DDOS 界面風格的發帖回帖
- 實時像素表情反應
- CRT 顯示器效果

## 性能指標

- 首屏加載 < 1s (壓縮後資源 < 200KB)
- 交互響應 < 100ms
- 像素完美還原

## 安裝指南

### 前置需求

- Node.js >= 18
- Bun >= 1.0
- PostgreSQL >= 14
- Redis >= 6
- Supabase 項目

### 環境配置

1. 克隆倉庫
```bash
git clone https://github.com/yourusername/pixel-forum.git
cd pixel-forum
```

2. 安裝依賴
```bash
# 安裝前端依賴
cd frontend
bun install

# 安裝後端依賴
cd ../backend
bun install
```

3. 配置環境變量
```bash
# 前端配置
cd frontend
cp .env.example .env.local
# 編輯 .env.local 文件，填入 Supabase 配置

# 後端配置
cd ../backend
cp .env.example .env
# 編輯 .env 文件，填入必要的配置信息
```

4. 初始化數據庫
```bash
# 在 backend 目錄下
bun run typeorm migration:run
```

### 開發環境運行

1. 啟動後端服務
```bash
# 在 backend 目錄下
bun run dev
```

2. 啟動前端服務
```bash
# 在 frontend 目錄下
bun run dev
```

訪問 http://localhost:3000 即可看到應用。

## 開發進度

### 已完成
- [x] 項目基礎架構搭建
- [x] 前端 UI 框架集成
- [x] 像素風格設計系統
- [x] 頭像生成器組件
- [x] CRT 顯示效果
- [x] 用戶認證系統
- [x] Supabase 集成

### 進行中
- [ ] 論壇板塊功能
- [ ] 發帖和回帖系統
- [ ] 表情反應功能
- [ ] 用戶個人資料
- [ ] 實時通知

### 計劃中
- [ ] 主題定制
- [ ] 多語言支持
- [ ] 社區管理工具
- [ ] 數據分析面板

## 貢獻指南

1. Fork 本倉庫
2. 創建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 代碼規範

- 使用 TypeScript 嚴格模式
- 遵循 ESLint 配置
- 組件採用函數式編程
- 狀態管理使用 Zustand
- CSS 使用 Tailwind 工具類

## 許可證

MIT License
