<template>
  <div class="home_box">
    <span @click="to">{{ publicKey }}</span>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const publicKey = ref('首页')
const router = useRouter()
const to = () => {
  router.push({
    name: 'demo'
  })
}
</script>
<style lang="scss" scoped src="./styles.scss"></style>
