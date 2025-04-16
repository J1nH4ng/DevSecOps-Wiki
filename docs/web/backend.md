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

- [x] JDK 8 （Java 服务所需运行时）
- [ ] Supervisor （Java 程序管理软件）
- [ ] Nginx （用于配置路由）

## 安装 JDK 8

这个部分的 Java 版本取决于你们公司内部的约定，可能是 JDK 8，也可能是 JDK 11，或者是 JDK 17。这里以常见的 JDK 8 版本为例。

Linux 安装 Java 运行时很简单，下载预先编译好的代码包解压并配置环境变量即可。

> [!NOTE] 说明：
> 
> Oracle 公司为了推进 JDK 高版本的使用，对于低版本的 JDK 需要注册登录 Oracle 进行下载。
> 
> 这里我们使用下载好地压缩包上传而不是使用 `wget` 命令进行在线下载配置。

1. 使用 XFtp 等工具将 JDK 8 的压缩包上传至后段服务器的 `/usr/local/src` 目录下

2. 解压 JDK 8 的压缩包

    ```bash
    tar -zxvf jdk-8u371-linux-x64.tar.gz
    ```

3. 移动 JDK 8 的目录至 `/usr/local/` 目录下

   ```bash
   mv jdk1.8.0_371 /usr/local/jdk8
   ```

4. 配置环境变量

   ```bash
   echo 'PATH=$PATH:/usr/local/jdk8/bin
   export PATH' >> /etc/profile

   echo 'JAVA_HOME=/usr/local/jdk8' >> /etc/profile
   ```
   
   配置完成后，还需要刷新环境变量：

   ```bash
   source /etc/profile
   ```

5. 验证 Java 版本

    使用如下命令查看当前的 Java 版本：

    ```bash
    java -version
    ```

## 安装与配置 Supervisor

### 安装 Supervisor

Supervisor 是一个进程管理工具，当进程中断的时候 Supervisor 能自动启动它，可以运行在各种类的 unix 机器上。

Supervisor 使用 Python 语言开发，可以将一个普通的命令行进程变为后台 daemon，并监控进程状态，异常退出时可以自动重启。

下载 supervisor 的源代码并解压：

```bash
cd /usr/local/src

wget https://files.pythonhosted.org/packages/ce/37/517989b05849dd6eaa76c148f24517544704895830a50289cbbf53c7efb9/supervisor-4.2.5.tar.gz

tar -zxvf supervisor-4.2.5.tar.gz
```

解压完成之后，使用 python3 进行安装：

```bash
cd /usr/local/src/supervisor-4.2.5

python3 setup.py install
```

等待安装完成后，还需要将命令配置到全局中便于使用，当然，不配置也是可以的。

```bash
ln -sf /usr/local/bin/supervisor* /usr/bin/

ln -sf /usr/local/bin/echo_supervisord_conf /usr/bin/
```

配置完成后，我们就可以通过如下命令查看 supervisor 的版本了：

```bash
supervisord --version
```

安装完成后，我们使用 Systemd 来管理 Supervisor 本身的进程：

```bash
vim /etc/systemd/system/supervisord.service
```

写入如下内容：

<<< @/public/files/systemd/supervisord.service{ini}

<a href="/files/systemd/supervisord.service" download="supervisord.service"><Badge type="info">点击下载该文件</Badge></a>

如果没有配置至全局命令，请替换其中的 `/usr/bin/supervisord` 为 Supervisor 安装后的绝对路径。

### 配置 Supervisor

## 安装配置 Nginx

### 编译安装 Nginx

### 配置 Nginx 主配置

### 配置 Nginx Java 配置