import type { FooterData } from "@theojs/lumen";

export const Footer_Data: FooterData ={
    beian: { icp: '苏 ICP 备 2024149705 号', police: '苏公网安备 32050502012208 号', showIcon: true },
    author: { name: 'J1nH4ng', link: 'https://www.4r3al.team' },
    group: [
        {
            title: '外部链接',
            icon: 'bx:link-external',
            color: 'rgba(255, 87, 51, 1)',
            links: [
                {name: 'Github', link: 'https://github.com/J1nH4ng', icon: 'solar:github-alt'},
                {name: 'LeetCode', link: 'https://leetcode.cn', icon: 'https://leetcode.cn/favicon.ico'}
            ]
        },
        {
            title: '友情链接',
            icon: 'bx:paper-plane',
            color: 'rgba(255, 87, 51, 1)',
            links: [
                { name: 'Shaw\'s Book', link: 'https://xiaoshebro.github.io/', icon: 'https://xiaoshebro.github.io/logo.svg'}
            ]
        },
        {
            title: 'Github Source',
            icon: 'bx:bxl-github',
            links: [
                { name: 'Keep', link: 'https://github.com/keephq/keep', icon: 'solar:github-alt'}
            ]
        }
    ]
}