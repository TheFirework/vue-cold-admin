import config from '@/config';
interface StorageData {
    value: unknown;
    expire: number | null;
  }

  export function setLocal(key: string, value: unknown, expire: number | null) {
    key = `${config.cache_prefix_key}${key}`
    const storageData: StorageData = { value, expire: expire !== null ? new Date().getTime() + expire * 1000 : null };
    const json = JSON.stringify(storageData);
    window.localStorage.setItem(key, json);
  }
  
  export function getLocal<T>(key: string) {
    key = `${config.cache_prefix_key}${key}`
    const json = window.localStorage.getItem(key);
    if (json) {
      let storageData: StorageData | null = null;
      try {
        storageData = JSON.parse(json);
      } catch {
        // 防止解析失败
      }
      if (storageData) {
        const { value, expire } = storageData;
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value as T;
        }
      }
      removeLocal(key);
      return null;
    }
    return null;
  }
  
  export function removeLocal(key: string) {
    window.localStorage.removeItem(key);
  }
  
  export function clearLocal() {
    window.localStorage.clear();
  }