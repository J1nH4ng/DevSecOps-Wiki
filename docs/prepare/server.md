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

- `/boot/`：确保为 1G
- `/data`：除去必要盘之外的其他容量全部给予 `/data` 下
- 磁盘格式配置为 lvm

### 网络配置

- 服务器的网络需要配置为静态网络地址，以确保服务器重启之后仍然为该 IP 地址
- DNS 最好配置为自建的 DNS 服务，用于保证可以进行内外网的域名解析