// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { HomeUnderline } from '@theojs/lumen'
import { HomeFooter } from '@theojs/lumen'
import { Footer_Data } from '../data/footerData'
import { ShareButton } from '@theojs/lumen'
import { umamiAnalytics } from '@theojs/lumen'
import { DocAsideLogo } from '@theojs/lumen'
import { Aside_Data } from '../data/asideData'
import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import { NolebaseInlineLinkPreviewPlugin } from '@nolebase/vitepress-plugin-inline-link-preview/client'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
// import { InjectionKey } from '@nolebase/vitepress-plugin-inline-link-preview/client';
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(HomeFooter, { Footer_Data }),
      'aside-ads-before': () => h(DocAsideLogo, { Aside_Data }),
      'aside-outline-before': () => h(ShareButton, {
        buttonIcon: 'fa6-solid:share-nodes',
        buttonText: '分享此页面',
        copiedIcon: 'mdi:thumbs-up',
        copiedText: '分享链接已复制！'
      }),
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(NolebaseGitChangelogPlugin),
    app.use(NolebaseInlineLinkPreviewPlugin),
    // app.provide(InjectionKey, {
    //   location: {
    //     'zh-CN': {
    //       popup: {
    //         loading: '加载中...',
    //         loadingAriaLabel: '加载中',
    //       }
    //     }
    //   }
    // }),
    app.component('Home', HomeUnderline),
    umamiAnalytics({id: '', src: 'https://umami.4r3al.team'})
  }
} satisfies Theme
