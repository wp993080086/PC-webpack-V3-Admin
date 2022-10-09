<template>
  <div class="user_config_box">
    <div class="user_config_item_box">
      <el-dropdown trigger="click" @command="handleChangeLang">
        <div class="user_config_item">
          <el-icon class="user_config_item_icon">
            <arrow-down v-if="lang === 'zhCn'" />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zhCn">中文简体</el-dropdown-item>
            <el-dropdown-item command="zhTw">中文繁体</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 切换语言
const lang = ref('zhCn')
const handleChangeLang = (command: string) => {
  console.log(command)
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
.user_config_box {
  @include flex_layout(y);
  max-width: 300px;
  height: 60px;
  .user_config_item_box {
    @include flex_layout();
    width: 50px;
    height: 100%;
    .user_config_item {
      &:hover .user_config_item_icon {
        animation: zoomIn 0.5s;
      }
    }
  }
}
</style>
