<template>
  <el-config-provider :locale="i18nLocal">
    <!-- 有导航栏 -->
    <template v-if="isShowHeader">
      <div id="main">
        <div id="main_left">
          <el-scrollbar>
            <ppd-menu />
          </el-scrollbar>
        </div>
        <div id="main_right">
          <pdd-header />
          <div id="container">
            <el-scrollbar>
              <router-view v-slot="{ Component }">
                <Transition name="fade_enter" mode="out-in">
                  <keep-alive :include="keepAliveNameList">
                    <component :is="Component" :key="refreshRouterViewKey" />
                  </keep-alive>
                </Transition>
              </router-view>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </template>
    <!-- 无导航栏 -->
    <template v-else>
      <router-view />
    </template>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'
import en from 'element-plus/lib/locale/lang/en'
import pddHeader from '@/components/header/index.vue'
import ppdMenu from '@/components/menu/index.vue'

const router = useRoute()
// 切换侧边栏宽度
const menuW = ref('210px')
// const changeW = () => {
//   const w = menuW.value
//   w === '120px' ? (menuW.value = '60px') : (menuW.value = '120px')
// }
// 是否显示头部导航栏
const isShowHeader = ref(false)
watch(
  () => router.meta,
  (newVal: TDict) => {
    isShowHeader.value = newVal.showHeader
  }
)
// 切换语言
const lang = {
  zhCn,
  zhTw,
  en
}
const i18nLocal = ref(lang.zhCn)

// keep-alive
const refreshRouterViewKey = ref('')
const keepAliveNameList = ref([])
</script>

<style lang="scss" scoped>
#main {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;

  #main_left {
    width: v-bind(menuW);
    height: 100%;
    transition: ease 0.5s;
    border-right: 1px solid #cccccc;
  }

  #main_right {
    flex: 1;
    height: 100%;

    #container {
      width: 100%;
      height: calc(100% - 60px);
    }
  }
}
</style>
