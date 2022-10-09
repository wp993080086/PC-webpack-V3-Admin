<template>
  <el-menu class="menu_main" @select="handleMenuSelect" @open="handleMenuOpen">
    <el-menu-item>
      <span>Navigator</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
// import { computed } from 'vue'
const handleMenuSelect = (ev: TDict) => {
  console.log(ev)
}
const handleMenuOpen = (ev: TDict) => {
  console.log(ev)
}
</script>

<style lang="scss" scoped>
.menu_main {
}
</style>
