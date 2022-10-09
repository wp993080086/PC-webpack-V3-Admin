<template>
  <div id="header_box">
    <div class="header_box_left">
      <div class="zoom_box">
        <el-icon v-if="isZoom" class="zoom_icon"><Expand /></el-icon>
        <el-icon v-else class="zoom_icon"><Fold /></el-icon>
      </div>
      <pdd-breadcrumb />
    </div>
    <div>
      <svg-icon name="password" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import pddBreadcrumb from '@/components/header/breadcrumb/index.vue'
import SvgIcon from '../svgIcon/index.vue'

const isZoom = ref(true)
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
#header_box {
  @include flex_layout(space-between);
  width: 100%;
  height: 60px;
  background-color: #c1c1c1;
  .header_box_left {
    display: flex;
    width: 350px;
    height: 100%;
    .zoom_box {
      @include flex_layout();
      width: 50px;
      height: 100%;
      .zoom_icon {
        cursor: pointer;
        transition: ease var(--pdd-transition-duration);
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
