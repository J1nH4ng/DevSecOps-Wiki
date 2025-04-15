---
title: Docker 安装配置文档
editLink: true
description: Docker 安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Linux, Docker, Cloud, CNCF
outline: deep
prev:
    text: 
    link: 
next:
    text: 
    link: 
---

# Docker 的安装与配置

## 安装

1. 先添加 Docker 官方仓库

    ```bash
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

2. 修改源文件

    由于并不是原生的 CentOS 系统，所以需要手动指定源文件中的版本以下载正确的 Docker

    ```bash
    vim /etc/yum.repos.d/docker-ce.repo
    ```

    执行如下命令批量查询替换

    ```bash
    :1.$s/\$releasever/7/g
    ```

3. 查询 Docker 版本

    ```bash
    yum list docker-ce --showduplicates | sort -r
    ```

4. 安装 Docker

    ```bash
    yum -y install docker-ce
    ```

5. 启用 Docker

    ```bash
    systemctl enable docker --now
    ```

## 配置

Docker 安装完成之后，还需要配置 `daemon.json` 文件，用于实现如下修改：

- 存储位置修改
- Docker 容器内 IP 变更
- 日志大小变更
- 私有仓库配置
- 镜像仓库配置

修改 `daemon.json` 文件，如果没有则创建：

```bash
vim /etc/docker/daemon.json
```

写入如下内容：

<<< @/files/docker/daemon.json