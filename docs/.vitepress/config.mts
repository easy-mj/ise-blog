import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ise-blog/",
  title: "FE探索者: 在代码海洋中破浪前行",
  description:
    "记录我在前端领域的深度探索，从攻克复杂技术难题，到钻研最新技术，分享成长路上的点滴心得与实战经验。",
  head: [["link", { rel: "icon", href: "/ise-blog/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "前端基础",
        items: [
          { text: "HTML", link: "/html/" },
          { text: "CSS", link: "/css/" },
          { text: "JS", link: "/js/" },
          { text: "TS", link: "/ts/" },
        ],
      },
      {
        text: "前端工程化",
        items: [{ text: "Webpack", link: "/webpack/" }],
      },
      {
        text: "前端架构",
        items: [
          { text: "架构基础知识", link: "/architecture/" },
          { text: "微前端", link: "/micro/" },
        ],
      },
    ],

    sidebar: {
      "/html/": [
        {
          text: "HTML",
          items: [{ text: "基础", link: "/html/" }],
        },
      ],
      "/css/": [
        {
          text: "CSS",
          items: [{ text: "基础", link: "/css/" }],
        },
      ],
      "/js/": [
        {
          text: "JS",
          items: [{ text: "基础", link: "/js/" }],
        },
      ],
      "/ts/": [
        {
          text: "TS",
          items: [{ text: "基础", link: "/ts/" }],
        },
      ],
      "/webpack/": [
        {
          text: "Webpack",
          items: [{ text: "概览", link: "/webpack/" }],
        },
      ],
      "/architecture/": [
        {
          text: "架构基础知识",
          items: [
            { text: "前世今生", link: "/architecture/" },
            { text: "软件设计原则与分层", link: "/architecture/01" },
            { text: "架构设计的质量-健壮性和稳定性", link: "/architecture/02" },
            { text: "架构前期准备", link: "/architecture/03" },
            { text: "技术填补与崩溃预防", link: "/architecture/04" },
            { text: "系统重构", link: "/architecture/05" },
          ],
        },
      ],
      "/micro/": [
        {
          text: "微前端",
          items: [
            { text: "概览", link: "/micro/" },
            { text: "自研框架", link: "/micro/01" },
          ],
        },
      ],
    },
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
