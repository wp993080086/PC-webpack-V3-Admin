<template>
  <div id="header_box">
    <div class="header_box_left">
      <div class="zoom_box">
        <el-icon v-if="isCollapse" class="zoom_icon" :size="20" @click="setIsCollapse"><Expand /></el-icon>
        <el-icon v-else class="zoom_icon" :size="20" @click="setIsCollapse"><Fold /></el-icon>
      </div>
    </div>
    <user-config />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import appStore from '@/store'
import userConfig from './user-config/index.vue'

const { setIsCollapse, getIsCollapse } = appStore.userModule
const isCollapse = computed(() => getIsCollapse())
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
      &:hover {
        background-color: var(--pdd-color-primary-light-9);
        .zoom_icon {
          animation: zoomIn var(--pdd-transition-duration);
        }
      }
      .zoom_icon {
        @include cursor_hover();
      }
    }
  }
}
</style>
