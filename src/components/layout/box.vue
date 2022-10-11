<template>
  <div class="layout_box">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '@/static/styles/common.scss';
.layout_box {
  @include box_shadow();
  width: calc(100% - 40px);
  margin: 0px 20px 20px 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
