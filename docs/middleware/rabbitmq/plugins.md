---
title: RabbitMQ 插件安装配置
editLink: true
description: RabbitMQ 插件安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Middleware, RabbitMQ
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# RabbitMQ 插件安装文档

## 常用插件介绍

RabbitMQ 支持许多插件，这些插件可以拓展 RabbitMQ 的功能和特性，常用地插件如下：

- Management Plugin：该插件提供了一个 Web 管理界面，用于监控和管理 RabbitMQ 服务器，可以查看队列、交换机、连接、通道等的状态，并进行配置和操作。
- Shovel Plugin: 该插件用于将信息从一个 RabbitMQ 服务器传递给另一个 RabbitMQ 服务器，实现消息复制和跨集群通信。可以用于实现数据复制、故障恢复、数据中心间同步等。
- Federation Plugin：该插件允许不同的 RabbitMQ 集群之间建立联合，实现消息的跨集群传递。这对于构建分布式系统、将消息从一个地理位置传递到另一个地址位置非常有用。
- STOMP Plugin：该插件允许使用 STOMP 协议与 RabbitMQ 进行通信。这对于使用非 AMQP 协议的客户端与 RabbitMQ 交互非常有用，例如使用 WebSocket  的 Web 应用程序。
- Prometheus Plugin：该插件用于将 RabbitMQ 的性能指标导出到 Prometheus 监控系统，以便于进行性能监控和警报。
- Delayed Message Plugin：该插件允许发布延迟交付的消息，使得可以在稍后的时间点将消息传递给消费者。这对于实现定时任务、延迟重试等场景非常有用。

## 具体安装配置

- [ ] Management Plugin
- [ ] Shovel Plugin
- [ ] Federation Plugin
- [ ] STOMP Plugin
- [ ] Prometheus Plugin
- [x] Delayed Message Plugin

### Delayed Message Plugin

> [!IMPORTANT] 注意事项：
> 
> 此插件旨在将消息延迟几秒钟、几分钟或几小时，最多一两天。
> 
> 这不是一个长期的调度解决方案。如果你需要将发布延迟数天、数周、数月或者数年，请考虑使用适合长期存储的数据存储或某种外部计划工具。

Mnesia[^1]

Khepri[^2]

[^1]: Mnesia 是 Erlang 内置的分布式数据库，设计初衷是为电信系统提供高可用和实时性。它是一个功能强大且易于使用的键值存储，支持内存和磁盘存储，广泛用于早期的 RabbitMQ 等应用。然而，Mnesia 在处理网络分区时存在局限性，特别是在数据一致性方面。

[^2]: Khepri 是 RabbitMQ 团队开发的新数据库，旨在替换 Mnesia，解决其在分布式环境下的不足。Khepri 基于 Raft 共识算法，专注于提供更高的数据一致性和网络分区容错能力，特别适用于 RabbitMQ 的元数据存储。**在 RabbitMQ 4.0 及更高版本中得到完全支持**。