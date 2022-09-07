<template>
  <div class="layout-header">
    <div class="layout-header-left flex-row-c">
      <div class="trigger-collapsed f-c-c mr-1" @click="changeCollapsed">
        <n-icon size="20" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="20" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <n-breadcrumb>
        <template v-for="route in breadcrumbList" :key="route.name">
          <n-breadcrumb-item>
            <n-dropdown v-if="route.children.length" :options="route.children" @select="dropdownSelect">
              <span class="link-text">
                {{ route.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              {{ route.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right flex-row-c"></div>
  </div>
</template>

<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
defineOptions({
  name: 'PageHeader'
})
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:collapsed'])
const route = useRoute()
const router = useRouter()
const changeCollapsed = () => emits('update:collapsed', !props.collapsed)
const generator: any = (routerMap: any[]) => {
  return routerMap
    .filter((n) => !['/'].includes(n.path))
    .map((item) => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/'
      }
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        currentMenu.children = generator(item.children)
      }
      return currentMenu
    })
}

const breadcrumbList = computed(() => {
  return generator(route.matched)
})

const dropdownSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<style scoped lang="scss">
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  height: 64px;
  box-shadow: 0 1px 4px #00152914;
}

.layout-header-left {
  display: flex;
  align-items: center;

  .trigger-collapsed {
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: 0 12px;
  }
}
</style>
