<template>
  <div class="demo_box">
    {{ publicKey }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const publicKey = ref('xxx')
</script>
<style lang="scss" scoped src="./style.scss"></style>
