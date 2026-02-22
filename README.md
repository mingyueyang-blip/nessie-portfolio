# Nessie Yang · 个人网站

产品经理个人网站，用于互联网校招展示。深色宇宙风格，三幕结构：星系概览 → 个人核心舱 → 详情（About Me / 作品集 / 思考与反思）。

## 本地运行

用浏览器直接打开 `index.html`，或使用本地服务器：

```bash
# 若已安装 Python 3
python3 -m http.server 8080

# 或使用 npx
npx serve .
```

然后访问 `http://localhost:8080`。

## 目录结构

- `index.html` - 单页结构，含第一幕、第二幕、第三幕各模块及 Contact 弹窗
- `css/style.css` - 全局样式、星空与粒子、各模块排版
- `js/main.js` - 幕切换、弹窗、复制联系方式、星流指示器与视差
- `assets/` - 已放入 `ip.png`（个人 IP 插画）、`wechat-qr.png`（微信二维码）

## 后续补充内容

- **About Me**：若更新宣言、经历、课程，可直接改 `index.html` 内对应区块，或把文案发给我替换
- **Portfolio**：炼金炉的 Product Logic / My Role 你后续更新后发给我；新项目按现有卡片+弹窗结构追加
- **Notes**：从钉钉粘贴全文发给我后，我会整理为 Markdown、生成摘要并写入列表与详情页
- **Contact**：若更换微信号/手机/邮箱/二维码，修改 `index.html` 中 Contact 弹窗内文案与 `assets/wechat-qr.png`

## 部署

可部署到 Vercel、Netlify 或 GitHub Pages：将本目录整体上传即可，无需构建。
# nessie-portfolio
