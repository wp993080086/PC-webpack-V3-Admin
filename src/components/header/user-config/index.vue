<template>
  <div class="user_config_box">
    <div class="user_config_item_box">
      <el-dropdown trigger="click" @command="handleChangeLang">
        <svg-icon class="user_config_item_icon" name="zh-cn" v-if="lang === 'zhCn'" />
        <svg-icon class="user_config_item_icon" name="en" v-else />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zhCn">中文简体</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="user_config_user_box">
      <el-dropdown trigger="click">
        <div>{{ userName }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLoguot">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { storeToRefs } from 'pinia'
import appStore from '@/store'
import userHttp from '@/servers/api/user'
import { deleteStorage } from '@/utils'

const { getUserInfo } = appStore.userModule
const { userName } = getUserInfo().userInfo!
// 切换语言
const lang = ref('zhCn')
const handleChangeLang = (command: string) => {
  console.log(command)
}
// 退出登录
const handleLoguot = async () => {
  await userHttp.logout({
    userId: getUserInfo().userInfo!.userId
  })
  deleteStorage('all')
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
    transition: ease var(--pdd-transition-duration);
    &:hover {
      background-color: var(--pdd-color-primary-light-9);
      .user_config_item_icon {
        animation: zoomIn var(--pdd-transition-duration);
      }
    }
    .user_config_item_icon {
      @include cursor_hover();
      font-size: 20px;
    }
  }
  .user_config_user_box {
    @include flex_layout();
    width: 100px;
    height: 100%;
  }
}
</style>
