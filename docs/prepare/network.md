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

## 简单的网络结构

一个最基本的网络结构如下图所示：

![此处应有图片]()

服务器个数为三台，一台反向代理，一台应用服务器，还有一台数据库服务器，网络流量经防火墙后通过反向代理服务器转发至应用服务器进行业务请求，而业务服务器会与数据库服务器进行通信，为了安全，数据库服务器仅对应用服务器开放且不与外部进行网络通信。