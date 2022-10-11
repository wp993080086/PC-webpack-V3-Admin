<template>
  <div id="breadcrumb_box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $t('message.router.home') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t(pathName) }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// 动态设置面包屑
const pathName = ref('')
const router = useRoute()
watch(
  () => router.meta,
  newVal => {
    pathName.value = (newVal as TRouterMeta).title
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
#breadcrumb_box {
  @include flex_layout(y);
  width: 100%;
  height: 40px;
  padding-left: 20px;
}
</style>
