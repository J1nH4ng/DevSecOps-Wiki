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
          '@nolebase/vitepress-plugin-enhanced-readabilities/client',
          '@nolebase/ui',
          'vitepress'
      ]
    },

    ssr: {
      noExternal: [
          '@nolebase/vitepress-plugin-inline-link-preview',
          '@nolebase/vitepress-plugin-enhanced-readabilities',
          '@nolebase/ui',
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
  cleanUrls: false,
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
    'docs/prepare/checklist.md': 'posts/55e3861d.md',
    'docs/infrastructure/gitlab.md': 'posts/894a942b.md',
    'docs/proxy/reverse-proxy-nginx.md': 'posts/2d22a002.md',
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

    outline: {
      level: 'deep',
      label: '文章目录'
    },


    sidebar: [
      {
        text: 'CVE 列表',
        collapsed: true,
        items: [
          { text: '高危漏洞', link: 'posts/a7fc9217' },
          { text: '中危漏洞', link: '' },
          { text: '低危漏洞', link: '' },
          { text: '无风险漏洞', link: '' }
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
        text: '基础设施部分',
        collapsed: true,
        items: [
          { text: '单点登录搭建', link: '' },
          { text: '代码仓库搭建', link: 'posts/894a942b' },
          { text: '容器仓库搭建', link: '' },
          { text: '代码质量检查', link: '' },
          { text: '邮件服务搭建', link: '' },
          { text: '系统镜像仓库搭建', link: '' },
          { text: '前端镜像仓库搭建', link: '' },
          { text: '后端镜像仓库搭建', link: '' },
          { text: '项目管理系统搭建', link: '' },
          { text: '知识文档仓库搭建', link: '' },
          { text: 'NTP 服务器搭建', link: '' },
          { text: 'DNS 服务器搭建', link: '' },
          { text: 'NFS 服务器搭建', link: '' }
        ]
      },
      {
        text: '代理服务器部分',
        collapsed: true,
        items: [
          { text: '负载均衡服务器（LVS）', link: '' },
          { text: '反向代理服务器（Nginx）', link: 'posts/2d22a002.md' },
          { text: '反向代理服务器（HAproxy）', link: '' },
          { text: '正向代理服务器（Nginx）', link: '' },
          { text: '正向代理服务器（Squid）', link: '' }
        ]
      },
      {
        text: '应用服务器部分',
        collapsed: true,
        items: [
          { text: '前端服务器', link: '' },
          { text: '后端服务器', link: '' }
        ]
      },
      {
        text: '数据库服务器部分',
        collapsed: true,
        items: [
          {
            text: 'MySQL 数据库部分',
            collapsed: true,
            items: [
              { text: 'MySQL 单点服务搭建', link: '' },
              { text: 'MySQL 主主集群搭建', link: '' },
              { text: 'MySQL MGR 集群搭建', link: '' },
              { text: 'MySQL 读写分离集群搭建', link: '' },
              { text: 'MySQL 性能和压力测试', link: '' },
              { text: 'MySQL 数据备份与恢复', link: '' },
              { text: 'MySQL 性能调优配置', link: '' }
            ]
          }
        ]
      },
      {
        text: '中间件服务器部分',
        collapsed: true,
        items: [
          {
            text: 'Redis 缓存部分',
            collapsed: true,
            items: []
          },
          {
            text: 'MinIO 对象存储部分',
            collapsed: true,
            items: []
          },
          {
            text: 'NacOS 配置中心部分',
            collapsed: true,
            items: []
          },
          {
            text: 'RabbitMQ 消息队列部分',
            collapsed: true,
            items: []
          },
          {
            text: 'ElasticSearch 搜索引擎部分',
            collapsed: true,
            items: []
          }
        ]
      },
      {
        text: 'CI & CD 服务器部分',
        collapsed: true,
        items: [
          {
            text: 'Jenkins 部分',
            collapsed: true,
            items: [
              { text: 'Jenkins 的安装配置', link: '' },
              { text: 'Jenkins 连接 K8S', link: '' },
              { text: 'Jenkins 脚本发布配置', link: '' },
              { text: 'Jenkins Pipeline 发布配置', link: '' }
            ]
          },
          {
            text: 'Github Actions 部分',
            collapsed: true,
            items: [
              { text: '自建 Runtime', link: '' },
              { text: 'Actions 发布配置', link: '' }
            ]
          },
          {
            text: 'GitLab CI/CD 部分',
            collapsed: true,
            items: []
          }
        ]
      },
      {
        text: '系统监控服务器部分',
        collapsed: true,
        items: [
          {
            text: 'Zabbix 监控部分',
            collapsed: true,
            items: []
          },
          {
            text: 'Prometheus 监控部分',
            collapsed: true,
            items: []
          }
        ]
      },
      {
        text: '日志监控部分',
        collapsed: true,
        items: [
          {
            text: 'ELK 日志链路搭建',
            link: ''
          },
          {
            text: 'ELK 结合 Kafka 拓展',
            link: ''
          }
        ]
      },
      {
        text: '容器化部分',
        collapsed: true,
        items: [
          {
            text: 'Docker 部分',
            collapsed: true,
            items: [
              { text: 'Docker 镜像代理', link: '' },
              { text: 'Docker 的安装和配置', link: '' },
              { text: 'Docker 网络配置详解', link: '' },
              { text: 'Docker 占用空间清理', link: '' },
              { text: 'Docker 镜像制作', link: '' },
              { text: 'Docker 镜像瘦身', link: '' }
            ]
          },
          {
            text: 'Kubernetes 部分',
            collapsed: true,
            items: [
              { text: 'K8S 的安装和配置', link: ''},
              { text: 'K8S Deployment 详解', link: '' },
              { text: 'K8S Service 详解', link: '' }
            ]
          }
        ]
      },
      {
        text: '自动化运维部分',
        collapsed: true,
        items: [
          {
            text: 'Ansible 部分',
            collapsed: true,
            items: []
          },
          {
            text: 'Terraform 部分',
            collapsed: true,
            items: []
          }
        ]
      },
      {
        text: '压力测试部分',
        collapsed: true,
        items: [
          { text: '压力测试性能指标', collapsed: true, link: '' }
        ]
      },
      {
        text: '业务迁移部分',
        collapsed: true,
        items: [
          {
            text: '注意事项',
            link: ''
          }
        ]
      },
      {
        text: '经验总结部分',
        collapsed: true,
        items: [
          {
            text: '需考证书列表',
            collapsed: true,
            items: [
              { text: '软件高级系统架构师证书', link: '' }
            ]
          },
          { text: '成长路线图介绍', link: '' },
          { text: '面试题目以及经验分享', link: '' },
          { text: '经验总结与融入新环境', link: '' }
        ]
      },
      {
        text: '细碎知识点部分',
        collapsed: true,
        items: [
          { text: 'Linux 常用命令备忘录', link: '' },
          { text: 'Linux 常见错误解决方法', link: '' },
          { text: 'Linux 网络错误排查方法', link: '' }
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
    },

    sideTitle: false,

    externalLinkIcon: true,
  }
})
