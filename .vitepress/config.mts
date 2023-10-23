import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "configcat-vue docs",
  description: "Documentation for the configcat-vue npm package",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'References', link: '/references' }
    ],

    sidebar: [
      {
        text: 'Resources',
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Quick Start', link: '/quick-start' },
          { text: 'Advanced Usage', link: '/advanced-usage' },
          { text: 'References', link: '/references' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/codedbychavez/configcat-vue' }
    ]
  }
})
