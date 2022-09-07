import cache from './cache'
import http from './http'
import route from './route'

const config: ConfigData = {
  ...http,
  ...cache,
  ...route
}

export default config
