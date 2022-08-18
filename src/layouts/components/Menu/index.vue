<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :options="menuOptions"
    :indent="24"
  />
</template>

<script setup lang="ts">
import { DashboardOutlined, SettingFilled } from '@vicons/antd'
import { MenuOption, NIcon } from 'naive-ui'
import { Component } from 'vue'

defineProps({
  collapsed: {
    type: Boolean
  }
})

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: 'components',
    key: 'dashboard',
    icon: renderIcon(SettingFilled),
    children: [
      {
        label: '图片裁剪',
        key: 'clipper'
      },
      {
        label: '表格',
        key: 'table'
      }
    ]
  }
]
const activeKey = ref<string | null>(null)
</script>

<style scoped></style>
