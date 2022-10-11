<template>
  <div id="header_box">
    <div class="header_box_left">
      <div class="zoom_box" @click="changeIsCollapse">
        <el-icon v-if="isCollapse" class="zoom_icon" :size="20"><Expand /></el-icon>
        <el-icon v-else class="zoom_icon" :size="20"><Fold /></el-icon>
      </div>
    </div>
    <div>
      <svg-icon name="password" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Expand, Fold } from '@element-plus/icons-vue'
import SvgIcon from '../svgIcon/index.vue'
import appStore from '@/store'

const { changeIsCollapse } = appStore.menuModule
const { isCollapse } = storeToRefs(appStore.menuModule)
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
#header_box {
  @include flex_layout(space-between);
  width: 100%;
  height: 60px;
  background-color: var(--pdd-bg-color);
  border-bottom: 1px solid #c1c1c1;
  .header_box_left {
    display: flex;
    width: 350px;
    height: 100%;
    .zoom_box {
      @include flex_layout();
      width: 50px;
      height: 100%;
      cursor: pointer;
      &:hover {
        background-color: var(--pdd-color-primary-light-9);
        .zoom_icon {
          animation-duration: var(--pdd-transition-duration);
          animation-name: zoomIn;
        }
      }
    }
  }
}
</style>
