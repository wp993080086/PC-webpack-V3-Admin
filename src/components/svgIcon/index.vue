<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface IProps {
  name: string
  class?: string
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  class: '',
  color: '#000000'
})

const color = computed(() => {
  return props.color
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})

const svgClass = computed(() => {
  if (props.class) {
    return `svg_icon ${props.class}`
  }
  return 'svg_icon'
})
</script>

<style scoped>
.svg_icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: v-bind(color);
  transition: ease var(--pdd-transition-duration);
}
</style>
