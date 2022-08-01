import http from "./http";

const config = {
  ...http,

  /** --------- cache 配置 --------- */
  // 缓存key前缀
  cache_prefix_key: "vue_cold_admin_",
  /** --------- cache 配置 --------- */
};

export default config;
