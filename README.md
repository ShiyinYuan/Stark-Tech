This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 快速开始

1. **安装依赖**

   ```bash
   npm install
   # 或
   yarn install
   ```

2. **启动开发服务器**

   ```bash
   npm run dev
   # 或
   yarn dev
   ```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🎨 主题定制

本项目已集成 MUI 主题，可在 `src/app/page.tsx` 中自定义主色、字体、间距等：

```ts
const theme = createTheme({
  palette: {
    primary: { main: "#2c7be5" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  spacing: 8,
});
```

## 📊 数据说明

- 营收数据、同比增长率等均通过 props 传递，支持灵活扩展。
- 图表与表格均支持自定义时间区间、滚动到最新数据。
- 搜索栏支持输入/选择，自动补全，数据去重与唯一 key 处理。

## 🧩 主要组件

- `SearchBar`：智能搜索与筛选
- `RevenueChart`：营收趋势与同比增长率图表
- `RevenueTable`：竖排表头、粘性列、斑马纹、数据对齐


## 📄 License

MIT

---

如需定制功能或有任何问题，欢迎提 Issue 或 PR！

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
