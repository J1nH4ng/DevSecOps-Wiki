---
title: 业务网络架构
editLink: true
description: 业务网络架构
layout: doc
head:
    - - meta
      - name: keywords
        content: Network
outline: deep
prev:
    text: 服务器初始化
    link: posts/7ec143e2
next:
    text: 业务上线检查事项
    link: posts/55e3861d
---

# 业务的网络结构模型介绍

## 简单业务的网络结构

一个最简单业务的网络结构如下图所示：

<div align="center">
    <img src="/public/images/nets/simple-server-net.svg" width="80%" height="80%" alt="简单业务的网络架构" />
</div>

这里服务器的总个数为四台，参与业务的服务器个数为三台，分别为一台反向代理，一台应用服务器，还有一台数据库服务器，网络流量经防火墙后通过反向代理服务器转发至应用服务器进行业务请求，而业务服务器会与数据库服务器进行通信，同时也会针对特定的网络请求进行网络开放，为了安全，数据库服务器仅对应用服务器开放且不与外部进行网络通信。

> [!IMPORTANT] 特别说明：
> 这个网络架构，不推荐生产业务使用，因为没有实现高可用的架构设计，业务的健壮性基本为零。