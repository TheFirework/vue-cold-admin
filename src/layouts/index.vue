<template>
  <n-layout has-sider :position="position">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <logo :collapsed="collapsed" />
      <SiderMenu :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>顶部</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import Logo from './components/Logo/index.vue'
import SiderMenu from './components/Menu/index.vue'

const position = ref<any>('absolute')
const collapsed = ref<boolean>(false)
</script>

<style scoped lang="scss"></style>
