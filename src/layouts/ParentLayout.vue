<template>
  <n-layout has-sider :position="position">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger
      :inverted="inverted"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <logo :collapsed="collapsed" />
      <sider-menu :collapsed="collapsed" :inverted="inverted" />
    </n-layout-sider>
    <n-layout class="layout-content">
      <n-layout-header>
        <page-header v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import PageHeader from './components/Header/index.vue'
import Logo from './components/Logo/index.vue'
import SiderMenu from './components/Menu/index.vue'

const position = ref<any>('absolute')
const collapsed = ref<boolean>(false)
const inverted = ref(true)
</script>

<style scoped lang="scss">
.layout-content {
  background-color: #f5f7f9;
}
</style>
