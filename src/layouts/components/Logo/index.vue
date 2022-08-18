<template>
  <div class="logo-wrap">
    <img src="@/assets/vue.svg" alt="" />
    <h2 class="title" v-if="!collapsed">ColdAdmin</h2>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  collapsed: {
    type: Boolean
  }
})
</script>

<style scoped lang="scss">
.logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    margin: 0;
    padding-left: 6px;
  }
}
</style>
