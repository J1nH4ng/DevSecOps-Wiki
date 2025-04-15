---
title: 反向代理服务器的安装配置
editLink: true
description: 反向代理服务器的安装配置文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Nginx, Proxy
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# 反向代理服务器的安装配置（Nginx）

> [!IMPORTANT] 特别注意：
> 如果有 LoadBalance 硬件的情况下，这里的所有配置可以在 LoadBalance 硬件上进行配置，所以这里的所有配置默认为上游没有 LoadBalance 硬件的情况下进行的安装配置。
> 
> 在上游的硬件支持的情况不完全的情况下，可以配置成三层的反向代理，并根据需要选择性的配置接下来的部分内容。

反向代理服务器位于应用服务器的上游，主要将内部服务进行代理从而不暴露真实的业务端口并根据域名和路由来处理外部流量，这里使用 Nginx 作为反向代理服务器，其具体负责处理的内容如下所示：

- SSL 证书卸载
- 金丝雀发布
- 负载均衡
- 访问控制
- 动静分离

并且，通过与 Lua 和 Redis 结合，可以实现更多更强大的功能： <Badge type="tip" text="持续更新" />

- 动态黑名单
- 高性能缓存

对于 Nginx 作为端口转发等正向代理服务器用途，会在后续知识库中具体描述，这里不做过多描述。 并且除了 Nginx 以外，还可以使用 HAproxy 作为反向代理服务器，也会在后续知识库中具体描述。

> [!TIP]
> [OpenResty](https://openresty.org/cn/) 集成了 Nginx 和大量的 Lua 模块，如果不想使用第三方软件，可以使用官方 Nginx 并根据需要自行添加所需的 Lua 模块

还有一些其他的具体应用配置如下：

- 连接数限制
- 防盗链配置
- 跨域配置
- 文件上传限制
  - 限制上传文件大小
  - 限制上传文件权限
- 防止 SQL 注入
- 防止目录遍历

同时，对于生产环境和测试环境还有部分不一样，具体部分如下：

- 缓存时间配置
- 高可用配置

## Nginx 的安装与配置

### Nginx 的安装

由于两台代理服务器是作为高可用使用的，逻辑意义上相当于一台服务器，故安装和配置是完全一样的，这里只描述其中一台的操作，对于两台之间的不同之处会重点指出，除此之外，没有任何的不同操作。这里为了方便后续的配置和功能的实现，会添加大量的 Lua 模块依赖文件。

#### 安装依赖

#### 编译安装

#### 配置 Systemd 管理

安装完成后，还需要使用 Systemd 软件进行进程管理，具体的配置方法如下：

1. 新建 nginx.service 文件

    ```bash
    vim /etc/systemd/system/nginx.service
    ```

2. 写入如下内容

    ```bash
    [Unit]
    Description=nginx
    After=network.target
    
    [Service]
    Type=forking
    ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
    ExecReload=/usr/local/nginx/sbin/nginx -s reload
    ExecStop=/usr/local/nginx/sbin/nginx -s quit
    LimitNOFILE=100000
    PrivateTmp=true
    
    [Install]
    WantedBy=multi-user.target
    ```

3. 更新 systemd 配置

    ```bash
    systemctl daemon-reload
    ```

### Nginx 的配置

Nginx 安装完成之后，还需要修改默认的配置，使其符合业务的需要，主要的配置方面有：

- [ ] 性能调优
- [x] SSL 证书卸载
- [ ] 负载均衡配置
- [ ] 反向代理至业务服务器
  - [x] 四层代理
  - [ ] 七层代理
- [x] 跨域配置
- [ ] 高性能缓存
- [ ] 安全配置
  - [x] 配置 HSTS
  - [ ] 访问控制
  - [x] 限制请求方式
  - [x] 限制请求速率
  - [x] 限制上传文件权限
  - [x] 限制上传文件大小
  - [ ] 设置防盗链
  - [x] 防止 SQL 注入和 XSS 攻击
  - [x] 禁止目录遍历
  - [x] 禁止爬虫
- [x] 开启监控

#### 性能调优

#### 配置 SSL 卸载

Nginx 可以处理 HTTPS 请求，具体的配置内容如下：

```nginx
server {
  listen 443 ssl;
  server_name wiki.4r3al.team;
  
  # 证书位置
  ssl_certificate /usr/local/nginx/ca/wiki.cer;
  ssl_certificate_key /usr/local/nginx/ca/wiki.key;
  # 启用 SSL 缓存
  ssl_session_cache shared:SSL:10m;
  ssl_session_timeout 1h;
  # 使用现代加密算法
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!3DES:!ADH:!RC4:!DH:!DHE;
  ssl_prefer_server_ciphers on;
  # 启用 OCSP Stapling
  ssl_stapling on;
  ssl_stapling_verify on;
}
```

#### 配置 HSTS

HSTS（HTTP 严格传输安全）是一种强制实施 HTTPS 连接的重要网络安全机制，同时结合 Nginx 配置 HTTP 转 HTTPS 使用，可以强制用户使用 HTTPS 协议进行访问，该配置项配置在 server 块内，具体的配置内容如下：

```nginx
server {
  listen 80;
  server_name wiki.4r3al.team;
  # 301 重定向
  return 301 https://$host$request_uri;
  # rewrite 重定向（不推荐）
  #rewrite ^(.*)$ https://$host$1 permanent;
}

server {
  listen 443 ssl;
  server_name wiki.4r3al.team;
  
  # SSL 证书的设置
  ...
  
  # 配置 HSTS
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
  
  # 其他的业务配置
  ...
}
```

值得注意的是：

- 这里的 `max-age` 的值是一年，如果生产使用，请先从较小的值开始，经过一段时间的检验后再逐步增大该值，例如可以从 `max-age=300` 开始，即 5min
- 对于 `includeSubDomains`，使用该选项之前，请确保所有的子域均已准备使用 HTTPS
- `preload` 表示将该配置缓存于用户的浏览器中，后续是很难撤销的，有着长期的影响，提交之前请确保已经做好了长期地维护准备

可能导致的问题：

- 需要长期监控 SSL 证书的有效性，一旦失效，影响将是严重的，会锁定用户造成严重的生产事故
- 一些网站的资源任然使用 HTTP 协议来加载，请考虑使用内容安全策略（CSP）标头来检测和报告混合内容
- 对于反向代理而已， HSTS 标头可能无法通过某些反向代理设置正确传播，需要正确配置反向代理
- HSTS 会导致访问 HTTP 的开发环境变得异常困难

#### 配置反向代理

流量经过反向代理服务器后需要分流到应用服务器上，对于不同的业务需要，需要分别配置四层或七层代理，四层代理适合高性能、低延迟的场景，不解析应用层协议，仅支持转发原始数据，适用于 MySQL 的反向代理、SSH 协议、DNS 等，而七层协议则需要解析 HTTP 协议，但是支持复杂的路由和逻辑场景，适用于 Web 服务和 API 网关等。

##### 四层代理

> [!IMPORTANT] 特别说明：
> Nginx 原始的四层代理不支持修改 header 头，如果需要修改，使用 stream-lua 模块结合 lua 脚本进行修改，如果只是单纯的修改 HTTP 请求的 header 头，请先考虑使用七层代理，如果不可行的话，再使用该方式进行修改。

在使用四层代理之前请确保 Nginx 将 `stream` 模块正确地编入其中，使用如下命令进行查看验证：

```bash
nginx -V | grep stream
```

对于四层代理的具体配置如下所示：

```nginx
stream {
  upstream dns {
    # 负载均衡配置
    ...
  }
  
  upstream mysql {
    server unix:/xxx/mysql.socket;
    check interval=3000 rise=2 fall=3 timeout=1000;
  }
  
  server {
    # 监听指定端口
    listen 53;
    proxy_connect_timeout 1s;
    proxy_timeout 20s;
    proxy_pass dns;
  }
  
  server {
    # 监听指定端口，协议
    # reuseport：启用端口复用，提高性能
    listen 3306 tcp reuseport;
    proxy_connect_timeout 1s;
    proxy_timeout 20s;
    
    proxy_pass mysql;
    
    proxy_next_upstream error timeout;
    proxy_next_upstream_timeout 10s;
    
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    allow 192.168.50.0/24;
    deny all;
    
    proxy_buffer_size 16k;
    proxy_buffers 4 32k;
  }
}
```

##### 七层代理

#### 配置跨域

跨域（CORS）：是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的 “预检” 请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。

> [!TIP] 特别说明：
> 请求方法，域名，端口有一个不一样都是跨域。

具体的配置内容如下：

```nginx
map $http_origin $cors_origin {
  default "";
  ~^https?://(example1\.com|example2\.com)$ $http_origin;
}

server {
  listen 80;
  server_name _;
  
  location / {
    if ($request_method = OPTIONS) {
      add_header 'Access-Control-Allow-Origin' $cors_origin;
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
      add_header 'Access-Control-Max-Age' 1728000;
      return 204;
    }
    
    add_header 'Access-Control-Allow-Origin' $cors_origin;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
    add_header 'Access-Control-Allow-Credentials' 'true';
    
     proxy_pass http://server;
  }
}
```

#### 配置 HTTP/2 连接

```nginx
http {
  # 开启 HTTP/2
  listen 443 ssl http2;
  
  # 优化连接复用
  keepalive_timeout 300s;
  keepalive_requests 10000;
  
  # 头部压缩优化
  gzip on;
  gzip_min_length 1k;
  gzip_comp_level 3;
  gzip_types text/plain application/json;
  
  # 调整缓冲区 Header
  http2_max_filed_size 16k;
  http2_max_header_size 64k;
  
  # 动态调整窗口大小
  http2_body_preread_size 128k;
  http2_streams_index_size 1024;
}
```

#### 配置高性能缓存

#### 配置动态黑名单

#### 限制请求方式

HTTP 的全部请求方式如下：

- GET：请求指定的页面信息，并返回实体主体
- HEAD：类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头
- POST：向指定的资源提交数据进行处理请求（例如提交表单或上传文件）。数据被包含在请求体中，POST 请求可能会导致新的资源的建立和/或已有资源的修改
- PUT：从客户端向服务器传送的数据取代指定文档的内容
- DELETE：请求服务器删除指定的页面
- CONNECT：HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器
- OPTIONS：允许客户端查看服务器的性能
- TRACE：回显服务器收到的请求，主要用于测试或诊断

大部分的网站只支持 GET 和 POST 方法，其他的方法并不会被响应，会抛出 404 或 405 错误，简单的原因如下：

- OPTIONS：将会造成服务器的信息暴露，如中间件的版本等
- PUT：由于 PUT 方法自身不带验证机制，可以简单的利用 PUT 上传 WebShell 或其他恶意文件，从而获取敏感数据或服务器权限
- DELETE：利用 DELETE 方法可以删除服务器上的特定资源，造成恶意攻击

新增一个请求限制文件：

```bash
vim ${nginx-path}/conf/method_deny.conf
```

写入如下内容：

```nginx
if ($request_method !~ ^(GET|POST)$) {
  return 405;
}
```

改配置文件引入在 location 块中，如果需要对接口进行更详细的配置，可以按照如下的方式进行配置，配置于 HTTP 块内：

```nginx
location /api/api-1 {
  limit_except GET {
    deny all;
  }
  
  proxy_pass http://api-server;
}

location /api/api-2 {
  limit_except POST {
    deny all;
  }
  
  proxy_pass http://api-server;
}
```

#### 限制请求速率

对于一个 IP 的请求而言。需要限制其请求的连接数和请求的速率，用于防止 DOS 攻击，具体的配置如下，配置于 http 块内：

```nginx
http {
  limit_conn_zone $binary_remote_addr zone=addr:10m;
  limit_conn addr 100;
  limit_req_zone $binary_remote_addr zone=req_zone:10m rate=10r/s;
  limit_req zone=req_zone burst=20 nodelay;
}
```

#### 限制上传文件

对于文件上传，也需要进行限制，防止上传大文件耗尽服务器资源，同时也要限制允许上传大文件类型，防止上传了 WebShell 或其他危险文件，从而对服务器造成危害行为：

```nginx
location /uploads/ {
  root /data/resources;
  client_body_temp_path /data/resources/tmp;
  client_max_body 10m;
  
  dav_methods PUT DELETE MKCOL COPY MOVE;
  create_full_put_path on;
  dev_access user:rw group:rw all:r;
  
  if ($request_filename ~* ^.*?\.(php|php5|sh|pl|py)$) {
    return 403;
  }
}
```

#### 设置防盗链

#### 防止 SQL 注入和 XSS 攻击

Nginx 本身并不直接处理 SQL 查询，以下的方式只是减少攻击面，完整的防护需要配合 WAF 和在应用程序层面进行真正地实现，这里不介绍 Nginx 集成 WAF 的具体操作以及结合后 WAF 的配置，只使用 Nginx 本身的功能配置来进行攻击面的减少：

```nginx
server {
  if ($request_uri ~* [;'<>] ) {
    return 444;
  }
  
  if ($args ~* [;'<>] ) {
    return 444;
  }
}
```

#### 禁止目录遍历

禁止访问隐藏的文件和目录，防止信息和文件泄漏，具体的配置如下：

```nginx
location ~ /\. {
  deny all;
  access_log off;
  log_not_found off;
}

location ~* ^/(uploads|images)/.*\.(php|php5|sh|pl|py|asp|aspx|jsp)$ {
  deny all;
}

location / {
  autoindex off;
}
```

#### 禁止爬虫

对于爬虫而言，理论上需要遵守网站的 `robots.txt` 文件内的内容，但是也有一些爬虫并不会严格遵守该约定，从而导致服务器的负载上升，性能下降，从而导致正常用户的使用体验下降，这是需要在 Nginx 中进行配置拦截。主要配置内容如下：

首先新建 `robots.txt` 文件：

```bash
vim robots.txt
```

写入如下内容：

```text
User-agent: *
Disallow: /
```

然后新增 nginx 的配置，该配置需要配置在 `server` 块下的 `location` 块内：

```nginx
server {
  location = /robots.txt {
    alias /${path-to-robots.txt}/robots.txt;
  }
}
```

对于不遵守的爬虫程序，还需要根据 UA 来进行禁止：

```nginx
server {
  listen 443 ssl;
  server_name wiki.4r3al.team;
  
  # SSL 配置
  ...
  
  # 禁止特定爬虫
  if ($http_user_agent ~* (bot|crawl|spider|scraper)) {
    return 403;
  }
  
  # 其他的业务配置
  ...
}
```

#### 开启监控

开启 Nginx 自带的监控内容，用于监控 Nginx 的性能，新建 `status.conf` 文件：

```bash
vim ${nginx-path}/conf/conf.d/status.conf
```

写入如下内容：

```nginx
location /status {
  stub_status;
  allow 127.0.0.1;
  allow ::1;
  deny all;
}
```

## 配置高可用

这里 Nginx 作用是作为反向代理服务器使用，且由于上流**没有 LoadBalance 硬件**进行分流和高可用的配置，这时需要使用软件来配置高可用，常用的方式有两种：

- 基于 Keepalived 的高可用
- 基于 Heartbeat 的高可用

两者的区别如下：

- Keepalived 使用更简单，但是 Heartbeat 功能更强大
- 使用协议不同，Keepalived 使用 VRRP 协议，而 Heartbeat 使用心跳进行通信和选举。

根据具体情况使用其中的一种高可用方式即可。

### 基于 Keepalived 的高可用

### 基于 Heartbeat 的高可用

## 附录 A

### 完整的 nginx.conf 文件

<<< @/files/nginx/nginx.conf

### 完整的 proxy.conf 文件

### 完整的 example.conf 文件