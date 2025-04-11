---
title: 业务上线检查事项
editLink: true
description: 业务上线检查事项列表
layout: doc
head:
    - - meta
      - name: keywords
        content: Linux
outline: deep
prev:
    text: 业务网络架构
    link: posts/0315077c
next:
    text: 单点登录搭建
    link: posts/0d2b3729
---

# 业务上线检查事项列表

## 前置检查

- [ ] 服务器初始化完成
- [ ] IP 地址为固定分配
- [ ] 磁盘正确挂载
- [ ] 安全加固完成
- [ ] 时钟同步
- [ ] 防火墙配置
- [ ] SeLinux 关闭
- [ ] 密码为强密码

## 应用部分

- [ ] 应用自启动配置
- [ ] 日志自动切割
- [ ] 网络关系正确开放
- [ ] 配置文件同步脚本

## 数据库部分

- [ ] 正确配置备份
  - [ ] 每日备份
  - [ ] 备份压缩
  - [ ] 定时删除
- [ ] 设置全局兜底的 limit

## 容器部分

- [ ] Docker 正确配置代理
- [ ] Docker 配置了 Harbor 私有仓库

## CI&CD 部分

- [ ] Jenkins 自动清理脚本配置
- [ ] Jenkins 打包配置集合（脚本方式）
  - [ ] Npm 代理
  - [ ] Maven 代理
  - [ ] 网络代理

## 其他文件部分

- [ ] 软件安装列表文档
  - [ ] 软件的版本
  - [ ] 软件的插件
- [ ] 应用安装列表文档
  - [ ] 应用的源码
  - [ ] 应用的脚本
  - [ ] 应用的定时任务
  - [ ] 应用的端口
  - [ ] 应用的 Nginx 配置文件
