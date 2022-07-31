export interface Config {
  baseURL: string;
  timeout: number;
  withCredentials: boolean;
  cache_prefix_key:string,
}

const config: Config = {
  /** --------- http 请求配置 --------- **/
  // api 请求基础路径
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 5000,
  withCredentials: false,
  /** --------- http 请求配置 --------- **/

  /** --------- cache 配置 --------- */
  // 缓存key前缀
  cache_prefix_key:'vue-cold-admin',
  /** --------- cache 配置 --------- */
};

export default config;
