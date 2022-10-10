<template>
  <template v-if="type === 'tips'">
    <el-popover v-bind="$attrs" popper-class="pdd_tips">
      <template #reference>
        <slot name="node" />
      </template>
    </el-popover>
  </template>
  <template v-else>
    <el-popover v-bind="$attrs" :visible="interiorShow" popper-class="pdd_popconfirm">
      <template #default>
        <div class="pdd_popconfirm_header" v-if="title">{{ title }}</div>
        <el-scrollbar :max-height="height"><slot /></el-scrollbar>
        <slot name="fixed" v-if="$slots.fixed" />
        <template v-if="footer">
          <slot name="footer" v-if="$slots.footer" />
          <div class="pdd_popconfirm_footer" v-else>
            <el-button size="small" @click="handleCancel">{{ cancelText }}</el-button>
            <el-button size="small" type="primary" @click="handleConfirm" v-loading="interiorLoading">
              {{ confirmText }}
            </el-button>
          </div>
        </template>
      </template>
      <template #reference>
        <slot name="node" />
      </template>
    </el-popover>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'pddPopconfirm',
  inheritAttrs: false,
  emits: ['update:show', 'cancel', 'confirm'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '关闭'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    title: {
      type: String
    },
    footer: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number
    },
    type: {
      type: String,
      default: 'popconfirm',
      validator: (value: string) => {
        return ['popconfirm', 'tips'].includes(value)
      }
    },
    async: {
      type: Boolean,
      default: false
    },
    load: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 控制Loading的变量
    const interiorLoading = ref(false)
    // 控制显现的变量
    const interiorShow = ref(props.show)
    watch(
      () => props.show,
      (val: boolean) => {
        interiorShow.value = val
      }
    )
    // 取消回调
    const handleCancel = () => {
      interiorShow.value = false
      emit('update:show', false)
      emit('cancel')
    }
    // 异步关闭回调
    const handleCancelFunc = () => {
      interiorLoading.value = false
      interiorShow.value = false
      emit('update:show', false)
    }
    // 确认回调
    const handleConfirm = () => {
      // 是否异步
      if (props.async) {
        interiorLoading.value = true
        emit('confirm', handleCancelFunc)
      } else {
        interiorShow.value = false
        emit('update:show', false)
        emit('confirm')
      }
    }

    return {
      handleCancel,
      handleConfirm,
      interiorShow,
      interiorLoading
    }
  }
})
</script>
<style lang="scss">
.pdd_popconfirm {
  .pdd_popconfirm_header {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 30px;
  }

  .pdd_popconfirm_footer {
    display: flex;
    align-items: end;
    justify-content: end;
    height: 30px;
  }
}
</style>
