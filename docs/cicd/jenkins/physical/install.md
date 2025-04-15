---
title: Jenkins 物理机安装配置
editLink: true
description: Jenkins 物理机安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Jenkins, Physical Machine
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# Jenkins 物理机安装配置

> [!NOTE] 说明：
> 
> 这里的物理机并非传统意义上的物理机，也可以是使用虚拟化技术虚拟出来的一台服务器。

由于这里的 Jenkins 单独使用了一台独立的服务器进行安装配置，所以将发布一个项目所需的依赖安装，打包等操作全部迁移至该台服务器运行。对于使用 k8s 项目的服务而言，还将在这台服务器上进行 Docker 镜像打包和推送至局域网内的 Harbor 镜像仓库操作，并使用 `kubectl` 远程连接 K8s 集群执行代码包的发布运行。

主要需要安装配置的软件如下：

- [ ] JDK 21 （Jenkins 运行所需）
- [ ] JDK 8 （与项目所需 Java 版本保持一致）
- [ ] Maven （用于打包 Java 项目）
- [ ] Nvm （用于进行前端 NodeJS 版本切换）
- [ ] Pnpm （用于前端代码打包）
- [ ] Docker （用于镜像制作和推送至私有仓库）

## 安装 Java

## 安装配置 Maven

## 安装配置 NodeJS

## 安装配置 Docker

<!--@include: ../../../cloud/docker/install.md{19,20}-->