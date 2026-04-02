# UI/UX Quiz App (Vite + React + Tailwind)

Ứng dụng trắc nghiệm UI/UX bằng tiếng Việt, gồm đầy đủ bộ câu hỏi theo đề gốc.

## Chạy local

### 1) Yêu cầu
- Node.js 18+ (khuyến nghị Node.js 20)
- npm

### 2) Cài dependency
```bash
npm install
```

### 3) Chạy môi trường dev
```bash
npm run dev
```

### 4) Build production
```bash
npm run build
```

### 5) Preview build
```bash
npm run preview
```

## Deploy GitHub Pages (tự động bằng GitHub Actions)

Repository đã có workflow: `.github/workflows/deploy.yml`.

Workflow sẽ chạy khi push lên nhánh `main`:
1. Setup Node
2. `npm ci`
3. `npm run build`
4. Upload thư mục `dist`
5. Deploy bằng `actions/deploy-pages`

`vite.config.js` đã tự động set `base` theo biến môi trường GitHub:
- Nếu chạy trong GitHub Actions với `GITHUB_REPOSITORY=owner/repo` → base là `/<repo>/`
- Khi chạy local → base là `/`

## Các bước bạn phải tự làm trên GitHub (manual)

1. Push code lên nhánh `main`.
2. Vào **Settings → Pages** của repository.
3. Ở phần **Build and deployment**, chọn **Source: GitHub Actions**.
4. Đảm bảo trong tab **Actions**, workflow “Deploy to GitHub Pages” chạy thành công.
5. Mở URL Pages sau khi deploy xong.
