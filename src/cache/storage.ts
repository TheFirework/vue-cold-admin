import { isNullOrUndef } from "@/utils";

export default class Storage {
  prefixKey: string;
  storage: globalThis.Storage;
  constructor(option: { storage: globalThis.Storage; prefixKey: string }) {
    this.storage = option.storage;
    this.prefixKey = option.prefixKey;
  }

  getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set(key: string, value: any, expire: number) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire)
        ? new Date().getTime() + expire * 1000
        : null,
    });
    this.storage.setItem(this.getKey(key), stringData);
  }

  get(key: string) {
    let data = this.getItem(key);
    if (data === null) {
      return null;
    }
    return data.value;
  }

  getItem(key: string, def = null) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;
    try {
      const data = JSON.parse(val);
      const { value, time, expire } = data;
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time };
      }
      this.remove(key);
      return def;
    } catch (error) {
      this.remove(key);
      return def;
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }
}


