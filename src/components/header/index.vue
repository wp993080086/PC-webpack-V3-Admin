<template>
  <div class="header_box">
    {{ menuW }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuW = ref(60)
</script>

<style lang="scss" scoped>
.header_box {
  width: 100%;
  height: 60px;
  background-color: #c1c1c1;
}
</style>
