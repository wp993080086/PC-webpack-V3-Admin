<template>
  <template v-if="menuList.children && menuList.children.length > 0">
    <el-sub-menu :index="menuList.index">
      <template #title>
        <span>{{ menuList.title }}</span>
      </template>
      <template v-for="item in menuList.children" :key="item.index">
        <menu-item :menu="item"></menu-item>
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menuList.index">{{ menuList.title }}</el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  menu: {
    type: Object || Array,
    default: () => ({})
  }
})

const menuList = computed(() => {
  return props.menu
})
</script>

<style lang="scss" scoped>
.el-menu-item,
.is-active {
  &:hover {
    background-color: #f6f8f9 !important;
  }
}
</style>
