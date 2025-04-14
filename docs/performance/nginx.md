---
title: Nginx 的性能优化
editLink: true
description: Nginx 的性能优化文档
layout: doc
head:
    - - meta
      - name: keywords
        content: Nginx, Performance
outline: deep
prev:
  text:
  link:
next:
  text:
  link:
---

# Nginx 的性能优化配置文档

> [!IMPORTANT] 特别注意：
> 
> Nginx 的性能优化要从整体的角度进行观察配置优化，不能觉得这个配置好，在每一台服务器上都配置一遍，正如贪心算法可能导致的结果一样，局部最优解不一定是整体最优解。

## gzip 压缩详解

> [!WARNING]
>
> 使用 SSL/TLS 协议时，压缩响应可能会受到 BREACH 攻击。
>
> 详情可见：[Nginx 官网对于 gzip 的讲解](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)

网站的加载速度对于用户的体验是至关重要的，更快地加载时间可以带来更高地用户参与度和转化率。网站加载速度取决于浏览器必须下载的所有文件的大小。减少要传输的文件大小可以使网站不仅加载更快，而且对于那些宽带是使用量计费的提供者更友好。

gzip 可以有效地压缩文件大小，而且不会显著降低数据质量，这是一种无损压缩算法。

在反向代理的服务器中的 `nginx.conf` 配置文件中添加如下内容用于启用 gzip 压缩：

```nginx
http {
    ...
    gzip on;
    gzip_min_length 1k;
    gzip_disable "MSIE [1-6]\.";
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    ...
    # gzip_vary on;
    gzip_proxied any;
    # gzip_buffers 4 16k;
}
```