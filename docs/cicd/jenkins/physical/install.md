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
- [x] Maven （用于打包 Java 项目）
- [x] NodeJS
  - [x] Nvm （用于进行前端 NodeJS 版本切换）
  - [x] Pnpm （用于前端代码打包）
- [x] Docker （用于镜像制作和推送至私有仓库）
- [ ] Jenkins
  - [ ] SSH 登录连接 GitLab 仓库
  - [ ] Ansible 免密配置
  - [ ] 配置镜像源
  - [ ] 配置插件

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

Maven 是一个跨平台的项目管理工具，主要用于管理 Jar 包依赖和一键构建项目。

可以去[官网](https://maven.apache.org/download.cgi)进行下载，也可以选择[清华源](https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3)进行下载，这里我们选择 Maven 3.9.9 版本进行使用。

### 安装 Maven

安装 Maven 与 Java 类型，下载预编译好地安装包并配置至环境变量即可。

1. 下载 Maven 3.9.9

   ```bash
   cd /usr/local/src

   wget https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
   
   tar -zxvf apache-maven-3.9.9-bin.tar.gz
   
   cp -r /usr/local/src/apache-maven-3.9.9 /usr/local/maven3.9
   ```

2. 配置环境变量

   ```bash
   echo '
   PATH=$PATH:/usr/local/maven3.9/bin
   export PATH' >> /etc/profile

   # 刷新环境变量
   source /etc/profile
   ```

### 配置 Maven

Maven 配置主要需要配置如下内容：

- [x] 修改第三方仓库为国内镜像源
- [x] 配置私有 Nexus 仓库认证配置
- [x] 配置 HTTP 代理认证用于访问私有 Nexus 仓库

Maven 的配置文件为安装目录下的 `/conf/setting.xml` 文件：

```bash
vim /usr/local/maven3.9/conf/setting.xml
```

1. 修改第三方仓库为国内镜像源

   ```xml
   <mirror>
	    <id>aliyunmaven</id>
	    <mirrorOf>*</mirrorOf>
	    <name>阿里云仓库</name>
	    <url>https://maven.aliyun.com/repository/public</url>
   </mirror>
   ```

2. 配置私有 Nexus 仓库认证配置

   server 块部分：
   
   ```xml
   <server>
        <id>Nexus</id>
        <username>${username}</username>
        <password>${password}</password>
   </server>
   ```
   
   mirror 块部署：   

   ```xml
   <mirror>
        <id>Nexus</id>
	    <mirrorOf>*</mirrorOf>
	    <url>https://nexus.4r3al.team/repository/maven-public/</url>
   </mirror>
   ```

3. 配置 HTTP 代理认证用于访问私有 Nexus 仓库

   ```xml
   <proxies>
      <proxy>
    	 <id>http-proxy</id>
    	 <active>true</active>
    	 <protocol>http</protocol>
         <host>proxy.4r3al.team</host>
    	 <port>80</port>
      </proxy>
      <proxy>
         <id>http-proxy</id>
         <active>true</active>
         <protocol>https</protocol>
         <host>proxy.4r3al.team</host>
         <port>443</port>
      </proxy>
   </proxies>
   ```

<a href="/files/maven/settings.xml" download="settings.xml"><Badge type="info">点击下载该文件</Badge></a>

## 安装配置 NodeJS

### 安装 NVM

由于前端使用的 NodeJS 版本的多样性，为了在后续使用 Jenkins 发布前端项目时方便快速切换至合适的 NodeJS 版本，这里使用 NVM 来管理多个 NodeJS 版本。

1. 下载 NVM

   NVM 发布在其 Github 仓库上，访问地址为：[NVM](https://github.com/nvm-sh/nvm)

   ```bash
   cd /usr/local/src
   
   wget https://github.com/nvm-sh/nvm/archive/refs/tags/v0.40.2.tar.gz -O nvm-0.40.2.tar.gz
   
   tar -zxvf nvm-0.40.2.tar.gz
   
   mv nvm-0.40.2 /usr/local/nvm0.40
   ```

2. 配置到 Bash 的 Profile 文件中

   ```bash
   echo "source /usr/local/nvm0.40/nvm.sh" >> ~/.bashrc
   
   source ~/.bashrc
   ```

3. 安装多版本 NodeJS

   ```bash
   nvm install v14.21.3
   
   nvm install v16.20.2
   
   nvm install v18.20.5
   ```

   > [!NOTE] 说明：
   >
   > NVM 可能未指定 NodeJS 仓库，从而导致下载失败，可以使用如下命令进行安装：
   >
   > ```bash
   > NVM_NODEJS_ORG_MIRROR=https://nodejs.org/dist nvm install 16.14.0
   > ```

### 安装 Pnpm

安装完 NodeJS 后，可以使用 NodeJS 自带的 npm 包管理器安装 pnpm。同时，为了保证前端第三方依赖包的兼容性，指定 pnpm 的版本为 8.0.0。

```bash
npm install -g pnpm@8.0.0
```

安装完成后，使用如下命令设置 pnpm 的源为国内镜像源：

```bash
pnpm config set registry https://registry.npmmirror.com
```

> [!TIP] 注意：
> 
> 使用 NVM 切换 NodeJS 版本后，仍然需要重新执行上述命令，各个 NodeJS 版本之间的配置是独立的。

## 安装配置 Docker

### 安装

<!--@include: ../../../cloud/docker/install.md{22,60}-->

### 配置

<!--@include: ../../../cloud/docker/install.md{62,81}-->

## 安装配置 Jenkins

### 安装 Jenkins

### 配置 Jenkins