module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-MMQM76Q","includeInDevelopment":true,"defaultDataLayer":null,"routeChangeEventName":"gatsby-route-change","enableWebVitalsTracking":false,"selfHostedOrigin":"https://www.googletagmanager.com"},
    },{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"https://fmm-admin.safe2choose.org/bk-gql","schema":{"timeout":300000,"queryDepth":15,"circularQueryLimit":5,"typePrefix":"Wp","perPage":100,"requestConcurrency":15,"previewRequestConcurrency":5},"html":{"useGatsbyImage":true,"createStaticFiles":true,"imageMaxWidth":null,"fallbackImageMaxWidth":100,"imageQuality":90,"generateWebpImages":false},"production":{"allow404Images":true,"hardCacheMediaFiles":false},"verbose":true},
    },{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#F78F2D","theme_color":"#F78F2D","display":"minimal-ui","icon":"src/images/gatsby-icon.png","icons":[{"src":"src/images/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"src/images/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"5821d8c4cf324950587303ad35a8b1b0"},
    },{
      plugin: require('../node_modules/gatsby-plugin-breadcrumb/gatsby-browser.js'),
      options: {"plugins":[],"useAutoGen":true},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
