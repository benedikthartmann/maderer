// based on: https://github.com/zeit/next.js/tree/canary/examples/with-env-from-next-config-js
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    MAPIURL_ADDRESSLIST: (() => {
      if (isDev) return 'http://localhost:3001/address/list'
      if (isProd) return 'https://maderer.appspot.com/address/list'
      if (isStaging) return 'http://localhost:11639'
      return 'MAPIURL_ADDRESSLIST:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    MAPIURL_ADDRESSNEW: (() => {
      if (isDev) return 'http://localhost:3001/address/0'
      if (isProd) return 'https://maderer.appspot.com/address/0'
      if (isStaging) return 'http://localhost:11639'
      return 'MAPIURL_ADDRESSNEW:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })()
  }

  // next.config.js object
  return {
    env
  }
}
