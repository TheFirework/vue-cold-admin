<template>
  <n-layout class="layout" has-sider :position="position">
    <n-layout-sider
      class="layout-sider"
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      show-trigger
      :position="position"
      :inverted="inverted"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <logo :collapsed="collapsed" />
      <sider-menu :collapsed="collapsed" :inverted="inverted" />
    </n-layout-sider>
    <n-layout :inverted="inverted">
      <n-layout-header>
        <page-header v-model:collapsed="collapsed" />
      </n-layout-header>
      <n-layout-content class="layout-content">
        <div class="layout-content-main">
          <main-view />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import PageHeader from './components/Header/index.vue'
import Logo from './components/Logo/index.vue'
import MainView from './components/MainView/index.vue'
import SiderMenu from './components/Menu/index.vue'

const position = ref<any>('absolute')
const collapsed = ref<boolean>(false)
const inverted = ref(true)
</script>

<style scoped lang="scss">
.layout {
  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    background-color: #f5f7f9 !important;

    .layout-content-main {
      height: calc(100vh - 108px);
      position: relative;
      overflow-y: auto;
      padding: 0 10px;
    }
  }
}
</style>
