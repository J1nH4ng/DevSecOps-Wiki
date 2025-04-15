---
title: 后端服务器的安装配置
editLink: true
description: 后端服务器的安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Nginx, Backend, Java
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# 后端服务器的安装配置

后端服务器主要用于运行 Java 应用程序，主要需要安装配置的软件应用有：

- [ ] JDK 8 （Java 服务所需运行时）
- [ ] Supervisord （Java 程序管理软件）
- [ ] Nginx （用于配置路由）

## 安装 JDK 8

这个部分的 Java 版本取决于你们公司内部的约定，可能是 JDK 8，也可能是 JDK 11，或者是 JDK 17。这里以常见的 JDK 8 版本为例。

Linux 安装 Java 运行时很简单，下载预先编译好的代码包解压并配置环境变量即可。

> [!NOTE] 说明：
> 
> Oracle 公司为了推进 JDK 高版本的使用，对于低版本的 JDK 需要注册登录 Oracle 进行下载，这里我们使用下载好地压缩包上传。

1. 使用 XFtp 等工具将 JDK 8 的压缩包上传至后段服务器的 `/usr/local/src` 目录下

2. 解压 JDK 8 的压缩包

    ```bash
    tar -zxvf 
    ```

3. 移动 JDK 8 的目录至 `/usr/local/` 目录下

4. 配置环境变量

5. 验证 Java 版本

    使用如下命令查看当前的 Java 版本：

    ```bash
    java --version
    ```

## 安装 Supervisord

## 安装配置 Nginx

### 编译安装 Nginx

### 配置 Nginx 主配置

### 配置 Nginx Java 配置