import { defineConfig } from 'vitepress';
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog';
// import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
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

    // optimizeDeps: {
    //   exclude: [
    //       '@nolebase/vitepress-plugin-inline-link-preview/client',
    //       '@nolebase/vitepress-plugin-enhanced-readabilities/client',
    //       '@nolebase/ui',
    //       'vitepress'
    //   ]
    // },

    // ssr: {
    //   noExternal: [
    //       '@nolebase/vitepress-plugin-inline-link-preview',
    //       '@nolebase/vitepress-plugin-enhanced-readabilities',
    //       '@nolebase/ui',
    //   ]
    // }
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
      // md.use(InlineLinkPreviewElementTransform);
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
    // CVE 列表
    'docs/cve/0day.md': 'posts/a7fc9217.md',
    'docs/cve/1day.md': 'posts/dd1b7a70.md',
    'docs/cve/1week.md': 'posts/f92de74b.md',
    'docs/cve/null-day.md': 'posts/569b3671.md',
    // 前置准备
    'docs/prepare/server.md': 'posts/3edbef81.md',
    'docs/prepare/init.md': 'posts/7ec143e2.md',
    'docs/prepare/network.md': 'posts/0315077c.md',
    'docs/prepare/checklist.md': 'posts/55e3861d.md',
    // 基础设施部分
    'docs/infrastructure/oneauth.md': 'posts/0d2b3729.md',
    'docs/infrastructure/gitlab.md': 'posts/894a942b.md',
    'docs/infrastructure/code-quality-check.md': 'posts/754dec14.md',
    'docs/infrastructure/mail.md': 'posts/d9b66711.md',
    'docs/infrastructure/harbor.md': 'posts/ed70e259.md',
    'docs/infrastructure/sys-mirror.md': 'posts/1648c8d5.md',
    'docs/infrastructure/npm-mirror.md': 'posts/45d6daaf.md',
    'docs/infrastructure/maven-mirror.md': 'posts/b4178878.md',
    'docs/infrastructure/project-manage.md': 'posts/c422df2b.md',
    'docs/infrastructure/team-wiki.md': 'posts/7317e374.md',
    'docs/infrastructure/ntp.md': 'posts/8975db6a.md',
    'docs/infrastructure/dns.md': 'posts/6c8dde8f.md',
    'docs/infrastructure/nfs.md': 'posts/d6bbd820.md',
    'docs/infrastructure/docker-proxy.md': 'posts/02bb9bb8.md',
    'docs/infrastructure/docker-image-check.md': 'posts/2dfd8dd9.md',
    // 代理服务器部分
    'docs/proxy/load-balance.md': 'posts/79043038.md',
    'docs/proxy/reverse-proxy-nginx.md': 'posts/2d22a002.md',
    'docs/proxy/reverse-proxy-haproxy.md': 'posts/5b664292.md',
    'docs/proxy/forward-proxy-nginx.md': 'posts/bf56f649.md',
    'docs/proxy/forward-proxy-squid.md': 'posts/bd53f826.md',
    // 应用服务器部分
    'docs/web/frontend.md': 'posts/1a7d5d9d.md',
    'docs/web/backend.md': 'posts/b8d4c961.md',
    // 数据库服务器部分
      // MySQL
      // DM
    // 中间件服务器部分
    // CI & CD 服务器部分
      // Jenkins 部分
        // 物理机部分
    'docs/cicd/jenkins/physical/install.md': 'posts/6513ad9e.md',
    // 系统监控服务器部分
    // 日志监控部分
    // 容器化部分
      // Docker
    'docs/cloud/docker/install.md': 'posts/4be2011a.md',
      // Kubernetes
    // 自动化运维部分
      // Ansible
      // Terraform
    // 压力测试部分
    // 性能优化部分
    'docs/performance/nginx.md': 'posts/51c0725e.md',
    // 业务迁移部分
    // 经验总结部分
    // 细碎知识点部分
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
          { text: '中危漏洞', link: 'posts/dd1b7a70' },
          { text: '低危漏洞', link: 'posts/f92de74b' },
          { text: '无风险漏洞', link: 'posts/569b3671' }
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
          { text: '单点登录搭建', link: 'posts/0d2b3729' },
          { text: '代码仓库搭建', link: 'posts/894a942b' },
          { text: '代码质量检查', link: 'posts/754dec14' },
          { text: '邮件服务搭建', link: 'posts/d9b66711' },
          { text: '容器仓库搭建', link: 'posts/ed70e259' },
          { text: '系统镜像仓库搭建', link: 'posts/1648c8d5' },
          { text: '前端镜像仓库搭建', link: 'posts/45d6daaf' },
          { text: '后端镜像仓库搭建', link: 'posts/b4178878' },
          { text: '项目管理系统搭建', link: 'posts/c422df2b' },
          { text: '知识文档仓库搭建', link: 'posts/7317e374' },
          { text: 'NTP 服务器搭建', link: 'posts/8975db6a' },
          { text: 'DNS 服务器搭建', link: 'posts/6c8dde8f' },
          { text: 'NFS 服务器搭建', link: 'posts/d6bbd820' },
          { text: 'Docker 镜像代理搭建', link: 'posts/02bb9bb8'},
          { text: 'Docker 镜像质量检查', link: 'posts/2dfd8dd9' }
        ]
      },
      {
        text: '代理服务器部分',
        collapsed: true,
        items: [
          { text: '负载均衡服务器（LVS）', link: 'posts/79043038' },
          { text: '反向代理服务器（Nginx）', link: 'posts/2d22a002.md' },
          { text: '反向代理服务器（HAproxy）', link: 'posts/5b664292' },
          { text: '正向代理服务器（Nginx）', link: 'posts/bf56f649' },
          { text: '正向代理服务器（Squid）', link: 'posts/bd53f826' }
        ]
      },
      {
        text: '应用服务器部分',
        collapsed: true,
        items: [
          { text: '前端服务器', link: 'posts/1a7d5d9d' },
          { text: '后端服务器', link: 'posts/b8d4c961' }
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
          },
          {
            text: '达梦数据库部分',
            collapsed: true,
            items: []
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
            items: [
              { text: 'RabbitMQ 单点服务搭建', link: '' },
              { text: 'RabbitMQ 仲裁队列搭建', link: '' }
            ]
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
              {
                text: '物理机安装配置',
                collapsed: true,
                items: [
                  { text: 'Jenkins 的安装配置', link: 'posts/6513ad9e' },
                  { text: 'Jenkins 连接 K8S', link: '' },
                  { text: '使用 Shell 脚本发布', link: '' },
                  { text: '使用 Pipeline 发布', link: '' },
                  { text: '使用 Jenkinsfile 发布', link: ''}
                ]
              },
              {
                text: '云容器安装配置',
                collapsed: true,
                items: [
                  { text: 'Jenkins 的安装配置', link: '' },
                  { text: 'Jenkins 连接 K8S', link: '' },
                  { text: '使用 Pipeline 发布', link: '' },
                  { text: '使用 Jenkinsfile 发布', link: ''}
                ]
              }
            ],
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
            text: 'ELK 日志系统',
            collapsed: true,
            items: [
              {
                text: 'ELK 日志链路搭建',
                link: ''
              },
              {
                text: 'ELK 结合 Redis 拓展',
                link: ''
              },
              {
                text: 'ELK 结合 Kafka 拓展',
                link: ''
              }
            ]
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
              { text: 'Docker 的安装和配置', link: 'posts/4be2011a' },
              { text: 'Docker 网络配置详解', link: '' },
              { text: 'Docker 占用空间清理', link: '' },
              { text: 'Docker 镜像制作', link: '' },
              { text: 'Docker 镜像瘦身', link: '' },
              { text: 'Docker 镜像手动导出导入', link: '' }
            ]
          },
          {
            text: 'Kubernetes 部分',
            collapsed: true,
            items: [
              { text: 'K8S 的安装和配置', link: ''},
              { text: 'K8S Deployment 详解', link: '' },
              { text: 'K8S Service 详解', link: '' },
              { text: 'Helm 的安装配置', link: '' }
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
          {
            text: '压力测试性能指标',
            collapsed: true,
            items: []
          }
        ]
      },
      {
        text: '性能优化部分',
        collapsed: true,
        items: [
          { text: 'Nginx 的性能优化', link: 'posts/51c0725e' },
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
            text: 'Linux 使用经验',
            collapsed: true,
            items: [
              { text: 'Linux 常用命令备忘录', link: '' },
              { text: 'Linux 常见错误解决方法', link: '' },
              { text: 'Linux 网络错误排查方法', link: '' },
              { text: 'rm -rf 后恢复文件', link: '' }
            ]
          },
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
          {
            text: 'Git 配置与使用部分',
            collapsed: true,
            items: [
              { text: 'Git 基本配置', link: '' }
            ]
          },
          {
            text: '你管这叫 XX 系列',
            collapsed: true,
            items: [
              { text: '你管这叫网络', link:'' }
            ]
          }
        ]
      },
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
