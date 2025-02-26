---
title: 服务器初始化
editLink: true
description: 服务器的初始化文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Linux
outline: deep
prev:
    text: 服务器的创建与配置
    link: posts/3edbef81
next:
    text: 业务网络架构
    link: posts/0315077c
---

# 服务器初始化

当操作系统安装完成后，需要对服务器进行初始化操作，以适应生产业务的需要，主要需要的操作内容如下：

- 软件安装
- 安全加固
- 性能调优
- 其他部分

所有需要配置的清单列表如下：

- [x] 服务器架构检查 <Badge type="warning" text="需要留意" />
  - [x] ARM 64 或 AMD 64
- [x] 各服务器之间的横向 SSH 是否联通 <Badge type="danger" text="后续影响" />
- [x] 服务器密码强弱性检查 <Badge type="danger" text="特别注意" />
  - [x] 弱密码
- [x] 修改镜像源
- [x] 安装依赖
- [x] 时钟同步
- [ ] 数据磁盘部分
  - [x] 虚拟机是否挂载数据盘
  - [x] 测试磁盘是否为 SSD <Badge type="danger" text="后续影响" />
  - [ ] 配置 LVM
- [ ] 升级 OpenSSL
- [ ] 升级 OpenSSH
  - [ ] 9.8p1 版本以上 
  - [ ] 禁用特定算法，修复 [CVE-2002-20001](a7fc9217) 漏洞
- [ ] 配置 SSH 安全
  - [ ] 修改默认的 22 端口
  - [x] 禁止 root 用户远程登录
  - [x] 禁止 su 命令切换至 root 用户
  - [ ] 配置 Fail2ban
- [ ] 防火墙开放状态
- [ ] SELinux 配置
- [ ] 配置文件最大打开数
- [ ] 调整内核参数

## 前置检查

### 服务器架构检查

检查服务器的系统架构，确保在安装业务所需软件时下载正确的架构版本安装包，使用如下命令进行查看：

```bash
uname -m
```

常见的为 64 位版本，输出结果一般为：`x86_64`，对于不同的输出，可以自行上网查看为何种架构，并在后续安装软件时下载对应的架构版本安装包即可，为了文档编写的方便，这里默认所有的服务器系统架构都为 64 位版本。

### 横向 SSH 通信检查

主要检查的是 Jenkins 或其他 CI&CD 软件所在的服务器能否通过 SSH 协议访问至应用服务器，主要影响在于后续配置流水线发布时需要通过 SSH 协议进行代码包分发，如果无法通信，后续流水线可能无法搭建。<Badge type="warning" text="寻找他法" />

检查方法很简单，在 Jenkins 所在服务器上使用 SSH 协议登录其他服务器，如果可以成功登录即证明通信正常，注意为了安全，可以端口号不是默认的 22 端口：

```bash
# 192.168.50.11 为应用服务器中的其中一台的局域网 IP 地址
# 22022 是为了安全而修改后的 SSH 协议占用的端口，如果不显式指定，则为默认的 22 端口
ssh nginx@192.168.50.11 -p 22022
```

如果成功，会要求输入密码进行验证登录，如果返回其他结果，请视具体情况而定。

这里以一台为例，对于其他的应用服务器，只需要修改相应的 IP 地址即可，这里不在做演示。

### 服务器密码强弱性检查

服务器的密码不能是常见的弱密码，最好为 16 位以上包含如下内容的乱序字符串：

- 大小写字母
- 数字
- 特殊标点

特别注意，不要使用容易混肴的字母和数字，例如：

- 0、o、O
- I、l、1
- 2、Z、z

如果密码不符合要求，可以使用如下命令来修改特定用户的密码。

> [!IMPORTANT] 特别注意：
> 注意使用 root 用户进行该操作

```bash
# 修改 nginx 用户密码
passwd nginx

# 修改 root 用户密码
passwd
```

## 软件安装配置

软件安装的主要是为了方便后续的运维操作，以及确保编译安装业务软件所需求的依赖存在等。

软件配置主要为配置终端和 vim 的 rc 文件，确保后续不会因为复制粘贴等问题影响缩进从而导致的错误，尤其是针对 yaml 这种强依赖缩进的文件格式。

### 修改镜像源

对于 OpenEuler 和 OpenKylin 系统来说，镜像源默认为国内源地址，不需要进行修改，对于旧的 CentOS 系统来说，镜像源已经不在维护，无需修改。

### 安装常用软件  <Badge type="tip" text="持续更新" />

对于常用地依赖软件，使用 `yum` 来进行安装，主要安装的内容如下：

1. 更新现存的文件依赖
  ```bash
  yum update -y
  ```
2. 安装常用地运维软件
  ```bash
  yum install -y gcc gcc-c++ make \
      net-tools kernel-devel \
      telnet ntpdate vim wget lrzsz \
      htop lsof iotop hdparm
  ```
3. 安装开发工具
  ```bash
  yum groupinstall -y 'Development tools'
  ```

## 时钟同步检查

> [!DANGER] 特别事项：
> 后续需要修改文章内容，为了安全性考虑，应该有一台时钟服务器进行时钟同步，其他服务器同步该服务器且不能访问外部网络。
> 该部分会在后续 NTP 服务器搭建完成后进行修改，也可以不进行修改，转而对服务器进行出网访问限制。

时钟同步配置主要目的在于确保服务器的时间的一致性，对于时延性有较高要求的业务有较大影响，比如：支付接口。

当前服务器的时钟状态可以使用 `timedatectl` 进行查看，执行结果如下：

```bash
               Local time: 三 2025-02-26 15:20:15 CST
           Universal time: 三 2025-02-26 07:20:15 UTC
                 RTC time: 三 2025-02-26 07:17:47
                Time zone: Asia/Shanghai (CST, +0800)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
```

国内时区为东八区，具体表现为上述结果的 Time zone 字段为 `Asia/Shanghai`，如果不是，可以使用如下命令进行修改：

```bash
timedatectl set-timezone Asia/Shanghai
```

修改完成后，重新执行 `timedatectl` 查看输出结果。

如果时间不对，执行如下命令进行同步：

```bash
ntpdate ntp.aliyun.com
```

时间同步成功后将同步后的时间写入至硬件时钟上：

```bash
clock -w
```

随着运行时间的增加，软件和硬件时钟也会逐步落后于标准时间，为了确保业务的可用性，还需要配置定时任务进行同步，使用如下命令创建定时任务。

```bash
crontab -e
```

写入配置文件，每半小时同步一次时钟：

```
// [!code ++]
# 时钟同步
// [!code ++]
*/30 * * * * /usr/sbin/ntpdate ntp.aliyun.com && /usr/sbin/clock -w
```

## 数据磁盘检查

### 查看磁盘挂载

尤其是对于虚拟机来说，新建服务器时会手动指定挂载数据磁盘，可以通过 `lsblk` 命令进行查看，会输出类似于如下结果：

```bash
vda    253:0    0   40G  0 disk 
├─vda1 253:1    0    4G  0 part [SWAP]
└─vda2 253:2    0   36G  0 part /
vdb    253:16   0  100G  0 disk 
```

如上所示，vdb 为挂载的数据盘，但是并没有初始化，所以没有任何分区显示。

### 判断磁盘类型 <Badge type="danger" text="后续影响" />

需要的磁盘类型主要根据该服务器在生产环境中的具体作用而定，对于数据库服务器，缓存服务器，热日志读写服务器等，磁盘最好为 SSD，而对于冷数据读取，可以使用 HDD 磁盘。

> [!TIP] 注意事项：
> 在虚拟机内，请根据磁盘的读写速度来判断磁盘类型，而不是系统输出的标识来判定。

使用如下命令来进行读写速度测试：

```bash
hdparm -Tt /dev/${disk-name}
```

运行结果如下：

```bash
[root@ECHO-SERVER ~]# hdparm -Tt /dev/nvme0n1

/dev/nvme0n1:
 Timing cached reads:   40446 MB in  1.98 seconds = 20439.89 MB/sec
 Timing buffered disk reads: 5384 MB in  3.00 seconds = 1794.45 MB/sec
```

可以查看到磁盘读取速度在每秒 1800 MB 左右，理论上 $\text{PCIE 4.0} \times 4$ 的 SSD 读取速度在 7000 MB/sec，同时根据磁盘命名也可以推测出来，nvme 开头的一般都为 SSD。

## 安全加固

安全加固的主要目的是为了保证服务器的安全性，具体的操作内容有以下几点：

- 升级低版本软件
- 修复系统漏洞
- 修改默认配置

### SSH 安全加固

出于安全性的进一步考虑，还需要配置禁止 root 用户的远程登录：

修改 `/etc/ssh/sshd_config` 文件，修改如下内容即可：

```diff
// [!code --]
# PermitRootLogin yes
// [!code ++]
PermitRootLogin no
```

如果需要禁止普通用户使用 `su -` 命令来切换至 root 用户，还需要配置如下内容：

```bash
vim /etc/pam.d/su
```

修改如下内容：

```diff
// [!code --]
auth          required        pam_wheel.so use_uid
// 注释该内容即可
// [!code ++]
# auth          required        pam_wheel.so use_uid
```

同理，可以进行反向运用处理无法切换至 root 用户的问题。

## 性能优化

性能优化的主要目的是为了让服务器性能得到最大释放，保证服务不会因为服务器的配置存在性能瓶颈，具体的操作内容有以下几点：

- 最大文件打开数修改
- 内核配置调整

## 其他部分

> [!NOTE] 备注：
> 该部分内容主要针对特定服务器的特定需求，对于不同业务而言，根据需要选择性的执行以下内容中的相关设置。