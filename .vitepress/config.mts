import { defineConfig } from 'vitepress';
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog';
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/J1nH4ng/DevSecOps-Wiki',
        mapAuthors: [
          {
            name: 'K1NG',
            username: 'J1nH4ng',
            mapByEmailAliases: [
                'j1nh4ng@icloud.com',
                '2838080432@qq.com'
            ],
            avatar: 'https://avatars.githubusercontent.com/u/74055444',
            links: 'https://github.com/J1nH4ng'
          }
        ]
      }),
      GitChangelogMarkdownSection(),
    ],

    optimizeDeps: {
      exclude: [
          '@nolebase/vitepress-plugin-inline-link-preview/client',
          'vitepress'
      ]
    },

    ssr: {
      noExternal: [
          '@nolebase/vitepress-plugin-inline-link-preview'
      ]
    }
  },
  lang: 'zh-CN',
  title: "DevSecOps Wiki",
  description: "DevSecOps Wiki",
  metaChunk: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://wiki.4r3al.team'
  },
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'rose-pine-dawn',
      dark: 'rose-pine-moon'
    },
    math: true,
    config(md) {
      md.use(InlineLinkPreviewElementTransform);
    },
    image: {
      lazyLoading: true
    }
  },
  rewrites: {
    'docs/cve/0day.md': 'posts/a7fc9217.md',
    'docs/prepare/server.md': 'posts/3edbef81.md',
    'docs/prepare/init.md': 'posts/7ec143e2.md',
    'docs/prepare/network.md': 'posts/0315077c.md'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '<iconify-icon icon="fa6-solid:bolt" style="margin-right:0.25em;color:#63E6BE;"></iconify-icon>快速开始',
        link: 'posts/3edbef81'
      },
      {
        text: '<iconify-icon icon="fa6-solid:bug" style="margin-right:0.25em;color:#FF4500;" alt="bug"></iconify-icon>提交反馈',
        link: 'https://github.com/J1nH4ng/DevSecOps-Wiki/issues'
      }
    ],

    sidebar: [
      {
        text: 'CVE 列表',
        collapsed: true,
        items: [
          { text: '高危漏洞', link: 'posts/a7fc9217' }
        ]
      },
      {
        text: '前置准备',
        collapsed: true,
        items: [
          { text: '创建配置服务器', link: 'posts/3edbef81' },
          { text: '服务器初始化', link: 'posts/7ec143e2' },
          { text: '业务网络架构', link: 'posts/0315077c' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/J1nH4ng/DevSecOps-Wiki' }
    ],

    lastUpdated: {
      text: '最近更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    editLink: {
      pattern: 'https://github.com/J1nH4ng/DevSecOps-Wiki/edit/main/docs/:path'
    }
  }
})
