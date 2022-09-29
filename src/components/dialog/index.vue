<template>
  <el-dialog
    :class="customClass"
    v-model="innerVisible"
    @open="handleDialogOpen"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="$attrs"
  >
    <template #header>
      <span class="pdd_dialog_title">{{ title }}</span>
      <slot name="head"></slot>
    </template>
    <div class="pdd_dialog_content" v-loading="contentLoading">
      <slot></slot>
    </div>
    <template v-if="!contentLoading" #footer>
      <slot name="footer" v-if="$slots.footer" />
      <template v-else>
        <el-button
          v-for="button in btnList"
          :key="button.key"
          :type="button.type"
          :loading="button.isLoading"
          :disabled="button.disabled"
          @click="handleButtonClick(button)"
        >
          {{ button.label }}
        </el-button>
      </template>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watch, reactive } from 'vue'

export default defineComponent({
  name: 'dialogComponent',
  inheritAttrs: false,
  emits: ['open', 'close', 'update:visible', 'btn-click'],
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: '温馨提示'
    },
    buttons: {
      type: Array as PropType<Array<TDialogButtonOption>>,
      default: () => [
        { label: '取消', key: 'no' },
        { label: '确定', key: 'yes', manualClose: true, async: true }
      ]
    },
    contentLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const customClass = ref(`pdd_dialog sagi_dialog_${props.size}`)
    const innerVisible = ref(props.visible)
    const btnList = reactive<Array<TDialogButtonOption>>([])
    const initButtons = () => {
      btnList.length = 0
      const btns: Array<TDialogButtonOption> = JSON.parse(JSON.stringify(props.buttons))
      for (const button of btns) {
        if (button.key === 'yes') button.type = 'primary'
        btnList.push(button)
      }
    }
    // 挂载完毕
    onMounted(() => {
      initButtons()
    })
    // 打开dialog
    const handleDialogOpen = () => {
      emit('open')
    }
    // 按钮点击
    const handleButtonClick = (button: TDialogButtonOption) => {
      const callback = () => {
        innerVisible.value = false
      }
      emit('btn-click', button, callback, btnList)
      if (button.async) {
        btnList.forEach(item => {
          if (item.key === button.key) {
            item.isLoading = true
          }
        })
      }
      if (!button.async && !button.manualClose) {
        innerVisible.value = false
      }
    }
    watch(() => props.buttons, initButtons)
    watch(
      () => props.visible,
      (val: boolean) => {
        innerVisible.value = val
      }
    )
    watch(innerVisible, (val: boolean) => {
      if (!val) {
        emit('update:visible', false)
      } else {
        for (const item of btnList) {
          item.isLoading = false
        }
      }
    })
    return {
      customClass,
      btnList,
      handleDialogOpen,
      innerVisible,
      handleButtonClick
    }
  }
})
</script>
<style lang="scss">
.pdd_dialog {
  border-radius: 6px !important;
  width: 50%;
  min-width: 600px;
  max-width: 800px;
  &.sagi_dialog_large {
    width: 65%;
    max-width: 1000px;
    min-width: 800px;
    .el-dialog__footer {
      .el-button {
        width: 140px;
      }
      .el-button + .el-button {
        margin-left: 60px;
      }
    }
  }
  &.sagi_dialog_small {
    width: 35%;
    min-width: 400px;
    max-width: 600px;
    .el-dialog__footer {
      .el-button {
        width: 100px;
      }
      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
  .el-dialog__header {
    border-radius: 6px 6px 0 0;
    height: 50px;
    padding: 0;
    padding-left: 20px;
    line-height: 50px;
    margin-right: 0 !important;
    .title_icon {
      position: absolute;
      left: 20px;
      top: 15px;
      opacity: 0.6;
      transition: 0.2s;
      line-height: 1.5;
      &:hover {
        opacity: 1;
      }
    }
  }
  .el-dialog__footer {
    text-align: right;
  }
  .pdd_dialog_title {
    margin-right: 10px;
  }
  .pdd_dialog_content {
    min-height: 100px;
  }
}
</style>
