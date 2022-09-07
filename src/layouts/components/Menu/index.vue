<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :options="menus"
    :inverted="inverted"
    :indent="24"
    @update:value="clickMenuItem"
  />
</template>

<script setup lang="ts">
import { useRouterStoreWidthOut } from '@/store'

defineProps({
  collapsed: {
    type: Boolean
  },
  inverted: {
    type: Boolean
  }
})

const router = useRouter()
const routerStore = useRouterStoreWidthOut()
const menus = ref([])
const activeKey = ref<string | null>(null)

const generator: any = (routeMap: any[]) => {
  return routeMap.map((e) => {
    const currentMenu = {
      ...e,
      label: e.meta.title,
      key: e.name,
      icon: e.meta.icon,
      show: !!e.meta.show
    }
    // 是否有子菜单，并递归处理
    if (e.children && e.children.length > 0) {
      currentMenu.children = generator(e.children)
    }
    return currentMenu
  })
}

onMounted(() => (menus.value = generator(routerStore.menus)))

const clickMenuItem = (key: string, item: { meta: { type: number; openType: string } }) => {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    if (item.meta.type === 2 && item.meta.openType === '_blank') {
      const routerInfo = router.resolve({ name: key })
      window.open(routerInfo.href, '_blank')
    } else {
      router.push({ name: key })
    }
  }
}
</script>

<style scoped></style>
