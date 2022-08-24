<template>
  <slot name="reference" :hide="hide" :show="show" :buttonList="buttonList"></slot>
  <el-dialog
    :custom-class="customClass"
    v-model="innerVisible"
    @open="handleDialogOpen"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-bind="$attrs"
  >
    <template #header>
      <span class="title-icon" v-if="titleIcon">
        <el-popover placement="bottom" trigger="hover">
          <template #reference>
            <i :class="titleIcon"></i>
          </template>
          <slot name="title-tip"></slot>
        </el-popover>
      </span>
      <span>{{ title }}</span>
    </template>
    <div class="iot_dialog-content" v-loading="contentLoading">
      <slot :hide="hide" :show="show" :buttonList="buttonList"></slot>
    </div>
    <template v-if="!contentLoading" #footer>
      <slot name="footer" v-if="$slots.footer" :hide="hide" :show="show" :buttonList="buttonList" />
      <template v-else>
        <el-button
          v-for="button in buttonList"
          :key="button.key"
          :type="button.type"
          :loading="button.isLoading"
          :disabled="button.disabled"
          size="default"
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

export const deepCopy = (val: TAny) => {
  if (val) {
    return JSON.parse(JSON.stringify(val))
  }
  return val
}

type TButtonItem = Partial<{
  type: string
  plain: boolean
  size: string
  isLoading: boolean
  key: string
  disabled: boolean
  manualClose: boolean // 手动关闭dialog
  async: boolean // 点击自动loading
  label: string
}>

type TBtnEnum = 'OK' | 'OK_CANCEL' | 'CLOSE' | 'OK_CLOSE' | 'OK_CANCEL_CLOSE'

const btnOK = {
  label: '确定',
  key: 'ok',
  type: 'primary'
}
const btnCancel = {
  label: '取消',
  key: 'cancel',
  type: 'plain'
}
const btnClose = {
  label: '关闭',
  key: 'cancel',
  type: 'plain'
}

const btnEnum = {
  OK: [btnOK],
  OK_CANCEL: [btnCancel, btnOK],
  CLOSE: [btnClose],
  OK_CLOSE: [btnClose, btnOK],
  OK_CANCEL_CLOSE: [btnClose, btnCancel, btnOK]
}

export default defineComponent({
  name: '-dialog',
  inheritAttrs: false,
  emits: ['open', 'close', 'update:visible', 'button-click'],
  props: {
    visible: {
      type: Boolean,
      // required: true
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    title: String,
    titleIcon: String,
    btnEnum: {
      // 使用枚举按钮
      type: String as PropType<TBtnEnum>
    },
    buttons: {
      type: Array as PropType<Array<TButtonItem>>,
      default: () => [
        { label: '取消', key: 'no' },
        { label: '确定', key: 'ok', manualClose: true, async: true }
      ]
    },
    contentLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const customClass = ref(`iot_dialog iot_dialog--${props.size}`)
    const innerVisible = ref(props.visible)
    const buttonList = reactive<Array<TButtonItem>>([])
    const initButtons = () => {
      buttonList.length = 0
      const enumBtns = props.btnEnum ? btnEnum[props.btnEnum] : null
      const bts: Array<TButtonItem> = enumBtns || deepCopy(props.buttons)
      for (const button of bts) {
        if (button.label === '确定') button.type = 'primary'
        buttonList.push(button)
      }
    }
    onMounted(() => {
      initButtons()
    })

    const hide = () => {
      innerVisible.value = false
    }

    const show = () => {
      innerVisible.value = true
    }

    const handleDialogOpen = () => {
      emit('open')
    }

    const handleButtonClick = (button: TButtonItem) => {
      emit(
        'button-click',
        button.key,
        button,
        () => {
          innerVisible.value = false
        },
        buttonList
      )
      if (button.async) {
        buttonList.forEach(item => {
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
        for (const item of buttonList) {
          item.isLoading = false
        }
      }
    })
    return {
      customClass,
      buttonList,
      handleDialogOpen,
      innerVisible,
      handleButtonClick,
      hide,
      show
    }
  }
})
</script>
<style lang="scss">
$c: #456fe7;
.iot_dialog {
  $br: 6px;
  border-radius: $br !important;
  width: 50%;
  min-width: 600px;
  max-width: 800px;
  &.iot_dialog--large {
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
  &.iot_dialog--small {
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
    $h: 50px;
    background: $c;
    color: #fff;
    border-radius: $br $br 0 0;
    height: $h;
    text-align: center;
    padding: 0;
    line-height: $h;
    margin-right: 0 !important;
    .title-icon {
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
    .el-dialog__headerbtn {
      top: 0px;
      i {
        color: #fff;
        opacity: 0.6;
        transition: 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .el-dialog__footer {
    text-align: center;
    .el-button + .el-button {
      margin-left: 40px;
    }
  }
  .iot_dialog-content {
    min-height: 100px;
  }
}
</style>
