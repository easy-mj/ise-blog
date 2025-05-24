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
      { text: "Home", link: "/" },
    ],

    sidebar: {},
    search: {
      provider: "local",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present MJ",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/easy-mj/ise-blog" },
    ],
  },
  lastUpdated: true,
});
