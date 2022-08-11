import { defineStore, storeToRefs } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
  }),
  getters: {
    isLogin: (state) => !!state.token,
  },
});

export function useUserStoreWith() {
  return useUserStore();
}

export function useUserStoreWithState() {
    return storeToRefs(useUserStore());
  }