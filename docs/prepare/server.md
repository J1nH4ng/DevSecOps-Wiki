---
title: 服务器的创建与配置
editLink: true
description: 服务器的创建配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Linux
outline: deep
prev:
  text: 无风险漏洞
  link: posts/569b3671
next:
  text: 服务器初始化
  link: posts/7ec143e2
---

# 服务器的创建与配置

## 创建服务器

在确定业务的架构之后，部署服务之前，首先需要确保的是有服务器可以使用，这里服务器有两种，一种是购买云服务器，另一种是购买裸金属。

对于云服务器而言，服务器上已经有操作系统存在了，而自己购买的裸金属是没有操作系统的，需要我们自己动手进行安装，而安装操作系统需要准备以下物品：

- U 盘 16G 以上
- 操作系统的 ISO 镜像文件
- 镜像写入软件

### 操作系统 ISO 镜像文件

由于 CentOS 7.0 停止维护，CentOS Stream 改为与 Arch Linux 一样的滚动发行版，不符合生产系统的需求，加上国产化操作系统的需求，这里有以下几个系统可以选择：

1. [OpenEuler](https://www.openeuler.org/zh/download/)
2. [OpenKylin](https://www.openkylin.top/downloads/)
3. [Rocky Linux](https://rockylinux.org/)
4. [Alma Linux](https://almalinux.org/get-almalinux/)

由于国内的网络环境，这里推荐使用 [OpenEuler](https://www.openeuler.org/zh/download/) 和 [OpenKylin](https://www.openkylin.top/downloads/) 两个操作系统。

### 镜像写入软件

下载完操作系统 ISO 镜像文件后，需要写入到 U 盘中并配置 Bios 引导程序，这里使用 [Ventoy](https://www.ventoy.net/en/index.html) 软件来进行镜像写入到 U 盘中。

这个软件的优势在于第一次使用初始化 U 盘后，后续只要将 ISO 文件拷贝至该 U 盘内即可，方便在一个 U 盘内写入多个镜像按需要进行安装操作，同时 U 盘的剩余空间还可以继续使用。

### 安装操作系统

插入 U 盘，启动服务器之后，根据不同的服务器说明指南，使用表明的按键进入系统的 BIOS 程序，在引导界面修改为 UEFI 引导，引导盘为刚才的 U 盘。接着就会进入到系统的安装操作界面，接着按照引导一步步安装即可。在安装界面内需要注意的有以下两点：

- 磁盘配置
- 网络配置

会在接下来的配置服务器中会详解描写。

## 配置服务器

### 磁盘配置

磁盘主要注意到以下几点即可：

- `/boot/`：确保为 1G 大小左右
- `/data`：除去必要盘之外的其他容量全部给予 `/data` 下
- 磁盘格式配置为 lvm

### 网络配置

- 服务器的网络需要配置为静态网络地址，以确保服务器重启之后仍然为该 IP 地址
- DNS 最好配置为自建的 DNS 服务，用于保证可以进行内外网的域名解析

## 特别说明

> [!IMPORTANT]
> 本 Wiki 的内容主要适用于 OpenEuler 操作系统，及基于 CentOS 二次发布的操作系统，对于基于 Debain 的操作系统，具体命令请根据需要进行依赖替换等操作。

服务器操作系统安装完成后，可以使用 [Xshell](https://www.xshell.com/zh/xshell/) 等工具进行连接，以便于接下来的操作。

对于一些业务所使用的名词，这里进行统一的介绍讲解：

### 环境分类

环境主要分为以下几个：

- dev：开发环境，开发人员使用，版本变动很大，外部网络无法访问。
- test：测试环境，专门给测试人员使用，版本相对稳定，外部网络无法访问，
- sit：系统集成测试，开发人员自己测试流程是否走通，外部网络无法访问。
- uat：用户验收测试环境，预发布环境，用于生产环境下的测试人员使用。
- pre：灰度发布环境，可以理解为内测环境。
- fat：功能验收测试环境，用于软件测试者使用。
- prod：生产环境，正式的线上环境。

一般需要的流程为：$\text{test} \rightarrow \text{uat} \rightarrow \text{prod}$
