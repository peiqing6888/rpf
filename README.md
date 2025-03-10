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
- PostgreSQL (Supabase)
- Redis
- Bun Runtime

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

## 開發進度

### 已完成

- [X] 項目基礎架構搭建
- [X] 前端 UI 框架集成
- [X] 像素風格設計系統
- [X] 頭像生成器組件
- [X] CRT 顯示效果
- [X] 用戶認證系統
- [X] Supabase 集成
- [X] 論壇板塊功能
- [X] 發帖和回帖界面
- [X] 表情反應 UI

### 進行中

- [ ] 實時通知系統
- [ ] 用戶個人資料完善
- [ ] 發帖和回帖功能實現
- [ ] 表情反應後端實現

### 計劃中

- [ ] 主題定制
- [ ] 多語言支持
- [ ] 社區管理工具
- [ ] 數據分析面板

## 快速開始

### 前置需求

- Node.js >= 18
- Bun >= 1.0
- PostgreSQL >= 14 (Supabase)
- Redis >= 6

### 安裝步驟

1. 克隆倉庫

```bash
git clone https://github.com/yourusername/pixel-forum.git
cd pixel-forum
```

2. 安裝依賴

```bash
# 前端依賴
cd frontend
bun install

# 後端依賴
cd ../backend
bun install
```

3. 環境配置

```bash
# 前端配置
cd frontend
cp .env.example .env.local
# 編輯 .env.local，填入 Supabase 配置

# 後端配置
cd ../backend
cp .env.example .env
# 編輯 .env，填入必要配置
```

4. 啟動服務

```bash
# 啟動後端（在 backend 目錄下）
bun run dev

# 啟動前端（在 frontend 目錄下）
bun run dev
```

訪問 http://localhost:3000 即可看到應用。

## 開發規範

- 使用 TypeScript 嚴格模式
- 遵循 ESLint 配置
- 組件採用函數式編程
- 狀態管理使用 Zustand
- CSS 使用 Tailwind 工具類

## 目錄結構

```
.
├── frontend/                # 前端項目
│   ├── src/
│   │   ├── app/           # Next.js 頁面
│   │   ├── components/    # React 組件
│   │   ├── lib/          # 工具函數
│   │   └── store/        # Zustand 狀態
│   └── public/           # 靜態資源
└── backend/               # 後端項目
    └── src/
        ├── modules/      # 業務模塊
        ├── entities/     # 數據實體
        └── main.ts       # 入口文件
```

## 貢獻指南

1. Fork 本倉庫
2. 創建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 提交規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文檔更新
- `style`: 代碼格式（不影響代碼運行的變動）
- `refactor`: 重構（既不是新增功能，也不是修改bug的代碼變動）
- `perf`: 性能優化
- `test`: 增加測試
- `chore`: 構建過程或輔助工具的變動

## 許可證

MIT License
