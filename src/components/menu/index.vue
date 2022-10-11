<template>
  <el-menu
    class="menu_main"
    :collapse="isCollapse"
    :unique-opened="true"
    :collapse-transition="false"
    default-active="/home"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#ffffff"
  >
    <div class="menu_logo_box">
      <img src="../../static/images/pdd.png" alt="logo" class="menu_logo" @click="changeIsCollapse" />
      <Transition name="ball_left" mode="out-in" appear>
        <div class="menu_logo_title" v-show="!isCollapse">P-Admin</div>
      </Transition>
    </div>
    <template v-for="menuItem in menuList" :key="menuItem.path">
      <menu-item :list="menuItem" />
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import appStore from '@/store'
import menuItem from './menu-item.vue'

const { changeIsCollapse } = appStore.menuModule
const { isCollapse, menuList } = storeToRefs(appStore.menuModule)
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
.menu_main {
  border-right: none !important;
  .menu_logo_box {
    @include flex_layout(y);
    width: 100%;
    height: 60px;
    padding-left: 12px;
    .menu_logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .menu_logo_title {
      color: var(--pdd-color-white);
    }
  }
}
</style>
