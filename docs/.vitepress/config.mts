import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ise-blog/",
  title: "前端象限",
  description:
    "记录我在前端领域的不断探索，构建系统化的前端知识体系，涵盖从基础到高级的核心内容以及成长路上的点滴心得与实战经验",
  head: [["link", { rel: "icon", href: "/ise-blog/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端基础",
        items: [{ text: "JavaScript 基础", link: "/ibt/javascript/" }],
      },
    ],

    sidebar: {
      // 前端基础 - JavaScript 基础
      "/ibt/javascript/": [
        {
          text: "JavaScript 基础",
          items: [
            { text: "概览", link: "/ibt/javascript/" },
            { text: "this指针/闭包/作用域", link: "/ibt/javascript/01" },
            { text: "面向对象编程/原型及原型链", link: "/ibt/javascript/02" },
          ],
        },
      ],
    },
    search: {
      provider: "local",
    },
    footer: {
      message: "种一棵树最好的时间是十年前，其次是现在。",
      copyright: "Copyright © 2025-present MJ",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/easy-mj/ise-blog" },
    ],
  },
  lastUpdated: true,
});
