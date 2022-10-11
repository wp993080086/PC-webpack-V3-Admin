<template>
  <pdd-box>
    <div class="demo_box">
      <span @click="to">{{ publicKey }}</span>
    </div>
  </pdd-box>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const publicKey = ref('demo')
const router = useRouter()
const to = () => {
  router.push({
    name: 'home'
  })
}
</script>
<style lang="scss" scoped src="./styles.scss"></style>
