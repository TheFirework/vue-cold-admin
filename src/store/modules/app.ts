import { defineStore, storeToRefs } from 'pinia'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const app = reactive({
    title: 'ColdAdmin'
  })
  function setTitle(title: string) {
    app.title = title
  }
  return {
    app,
    setTitle
  }
})

export function useAppStoreWithState() {
  return storeToRefs(useAppStore())
}

export function useAppStoreWithAction() {
  return useAppStore()
}
