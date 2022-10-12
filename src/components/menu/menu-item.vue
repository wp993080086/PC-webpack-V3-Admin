<template>
  <template v-if="menuList.children && menuList.children.length > 0">
    <el-sub-menu :index="menuList.path">
      <template #title>
        <svg-icon :name="menuList.icon" />
        <span class="menu_title">{{ menuList.title }}</span>
      </template>
      <template v-for="menuItem of menuList.children" :key="menuItem.path">
        <menu-item :list="menuItem"></menu-item>
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menuList.path">
      <svg-icon :name="menuList.icon" />
      <span class="menu_title">{{ menuList.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { IMenuList } from '@/store/modules/menu/menu'

const props = defineProps({
  list: {
    type: Object,
    default: () => ({})
  }
})

const menuList = computed(() => {
  return props.list as IMenuList
})
</script>

<style lang="scss" scoped>
.is-active {
  background-color: #434a50 !important;
}
.menu_title {
  margin-left: 10px;
}
</style>
