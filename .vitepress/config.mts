import { defineConfig } from 'vitepress';
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog';
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import taskLists from "markdown-it-task-checkbox";
import vitepressProtectPlugin from 'vitepress-protect-plugin';
import footnote_plugin from 'markdown-it-footnote';

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
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2838080432&s=640',
            links: 'https://github.com/J1nH4ng'
          }
        ]
      }),
      GitChangelogMarkdownSection(),
      vitepressProtectPlugin({
        disableF12: true,
        disableConsole: true,
        disableSelect: false,
      })
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
  head: [
    ['link', { rel: 'icon', href: 'https://q1.qlogo.cn/g?b=qq&nk=2838080432&s=100' }],
  ],
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
    image: {
      lazyLoading: true
    },
    math: true,
    config(md) {
      md.use(InlineLinkPreviewElementTransform);
      md.use(taskLists, {
        disabled: true,
        divWrap: false,
        divClass: 'checkbox',
        idPrefix: 'cbx_',
        ulClass: 'task-list',
        liClass: 'task-list-item',
      });
      md.use(footnote_plugin);
    },
  },
  rewrites: {
    'docs/cve/0day.md': 'posts/a7fc9217.md',
    'docs/prepare/server.md': 'posts/3edbef81.md',
    'docs/prepare/init.md': 'posts/7ec143e2.md',
    'docs/prepare/network.md': 'posts/0315077c.md',
    'docs/prepare/checklist.md': 'posts/55e3861d.md'
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
          { text: '业务网络架构', link: 'posts/0315077c' },
          { text: '业务上线检查事项', link: 'posts/55e3861d.md'}
        ]
      },
      {
        text: '代理服务器部分',
        collapsed: true,
        items: []
      },
      {
        text: '应用服务器部分',
        collapsed: true,
        items: []
      },
      {
        text: '数据库服务器部分',
        collapsed: true,
        items: []
      },
      {
        text: '中间件服务器部分',
        collapsed: true,
        items: []
      },
      {
        text: 'CI & CD 服务器部分',
        collapsed: true,
        items: []
      },
      {
        text: '系统监控服务器部分',
        collapsed: true,
        items: []
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
    },

    sideTitle: false,

    externalLinkIcon: true,
  }
})
