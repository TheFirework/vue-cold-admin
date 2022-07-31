import config from "@/config";
import Storage from "./storage";

export const cache = new Storage({
  prefixKey: config.cache_prefix_key,
  storage: localStorage,
});
