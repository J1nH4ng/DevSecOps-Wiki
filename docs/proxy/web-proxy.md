---
title: 应用代理服务器的安装配置
editLink: true
description: 应用代理服务器的安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Nginx, Proxy
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# 应用代理服务器的安装配置

应用代理服务器位于应用服务器的上游，主要负载处理的内容如下所示：

- 高可用
- SSL 证书卸载
- 金丝雀发布
- 负载均衡
- 访问控制

并且，通过与 Lua 和 Redis 结合，可以实现更多的功能：

- 动态黑名单处理
- 高性能缓存

对于端口转发等正向代理服务器用途，会单独介绍，这里介绍的是参与业务流程的反向代理配置。

> [!TIP]
> [OpenResty](https://openresty.org/cn/) 集成了 Nginx 和大量的 Lua 模块，如果不想使用第三方软件，可以使用官方 Nginx 并根据需要自行添加所需的 Lua 模块

