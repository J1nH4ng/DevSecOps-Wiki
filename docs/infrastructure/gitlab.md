---
title: 代码仓库搭建
editLink: true
description: 私有代码仓库搭建
layout: doc
head:
    - - meta
      - name: keywords
        content: Linux, Git, GitLab
outline: deep
prev:
    text: 业务上线检查事项列表
    link: posts/55e3861d
next:
    text:
    link:
---

# 代码仓库搭建

出于业务以及维护的需求考虑，使用成熟的开源软件 GitLab 作为内部代码仓库。对于轻量使用的情况下，可以选择轻量级的 Gogs、Gitea 等作为内部代码仓库使用。这里我们不做介绍。

对于 GitLab 的搭建，有以下两种方式进行运行，分别为：

- 物理机（虚拟机）运行
- 容器化运行

对于不同的运行方式，安装部署的方式也不尽相同，这里分别进行介绍。

## 物理机（虚拟机）运行

物理机（虚拟机）安装运行，主要的注意事项如下：

- [ ] 确认支持的版本
- [ ] 修改存储目录
- [ ] 配置反向代理
- [ ] 配置高可用
- [ ] 配置备份
- [ ] 配置邮件通知

### 下载安装

> [!IMPORTANT] 注意事项：
> 
> 如果没有必要的数据安全等方面的需求，请尽量下载国外的 GitLab 版本，而不是国内的极狐版本。

## 容器化运行

### 使用 Docker 运行

### 使用 K8s 运行