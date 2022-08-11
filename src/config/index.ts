import http from "./http";

const config:ConfigData = {
  ...http,

  /** --------- cache 配置 --------- */
  // 缓存key前缀
  cachePrefixKey: "vue_cold_admin_",
  ACCESS_TOKEN:"ACCESS-TOKEN",
  USERINFO:"USER-INFO"
  /** --------- cache 配置 --------- */
};

export default config;
