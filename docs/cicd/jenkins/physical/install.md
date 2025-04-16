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

- [x] JDK 21 （Jenkins 运行所需）
- [x] JDK 8 （与项目所需 Java 版本保持一致）
- [ ] Maven （用于打包 Java 项目）
- [ ] Nvm （用于进行前端 NodeJS 版本切换）
- [ ] Pnpm （用于前端代码打包）
- [ ] Docker （用于镜像制作和推送至私有仓库）

## 安装 Java

### 安装 JDK 21

> [!IMPORTANT] 特别说明：
>
> 这里的 JDK 21 为 Jenkins 运行所需运行时，不写入环境变量中，在启动 Jenkins 时以绝对路径使用。

1. 使用 XFtp 等工具将 JDK 21 的压缩包上传至后段服务器的 `/usr/local/src` 目录下

2. 解压 JDK 21 的压缩包

    ```bash
    tar -zxvf jdk-21_linux-x64.tar.gz
    ```

3. 移动 JDK 21 的目录至 `/usr/local/` 目录下

   ```bash
   mv jdk-21 /usr/local/jdk21
   ```

4. 验证 Java 版本

   使用如下命令查看当前的 Java 版本：

    ```bash
    java -version
    ```


### 安装 JDK 8

> [!IMPORTANT] 特别说明：
> 
> 这里的 JDK 8 与业务应用生产环境使用版本一致，并写入至环境变量中。

<!--@include: ../../../web/backend.md{33,75}-->

## 安装配置 Maven

### 安装 Maven

### 配置 Maven

## 安装配置 NodeJS

## 安装配置 Docker

### 安装

<!--@include: ../../../cloud/docker/install.md{22,60}-->

### 配置

<!--@include: ../../../cloud/docker/install.md{62,80}-->

## 安装配置 Jenkins

### 安装 Jenkins

### 配置 Jenkins