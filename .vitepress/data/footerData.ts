import type { FooterData } from "@theojs/lumen";

export const Footer_Data: FooterData ={
    beian: { icp: '苏 ICP 备 2024149705 号', police: '苏公网安备 32050502012208 号', showIcon: true },
    author: { name: 'J1nH4ng', link: 'https://www.4r3al.team' },
    group: [
        {
            title: '外部链接',
            icon: 'bx:link-external',
            color: 'rgba(168, 194, 223, 1)',
            links: [
                {name: 'Github', link: 'https://github.com/J1nH4ng' },
                {name: 'LeetCode', link: 'https://leetcode.cn' }
            ]
        },
        {
            title: '友情链接',
            icon: 'bx:paper-plane',
            color: 'rgba(168, 194, 223, 1)',
            links: [
                { name: 'Shaw\'s Book', link: 'https://xiaoshebro.github.io/' }
            ]
        },
        {
            title: 'Github Source',
            icon: 'bx:bxl-github',
            links: [
                { name: 'Keep', link: 'https://github.com/keephq/keep' },
                { name: '脚本分享', link: 'https://github.com/J1nH4ng/SCSL' },
                { name: '配置文件分享', link: 'https://github.com/14Bytes/dotConfigFiles4Share' }
            ]
        },
        {
            title: '技术博客',
            icon: 'bx:globe',
            color: 'rgba(249, 197, 181, 1)',
            links: [
                { name: 'MySQL Performance Blog', link: 'https://mysqlperf.github.io/' }
            ]
        }
    ]
}

