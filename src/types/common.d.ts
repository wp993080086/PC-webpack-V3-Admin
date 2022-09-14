/**
 * Dialog 按钮配置
 * @param {String} type 按钮风格
 * @param {Boolean} plain 是否朴素按钮
 * @param {String} size 按钮大小
 * @param {Boolean} isLoading 是否Loading
 * @param {String} key 唯一键
 * @param {Boolean} disabled 是否禁止
 * @param {Boolean} manualClose 需要手动关闭dialog
 * @param {Boolean} async 是否异步关闭
 * @param {String} label 按钮文案
 */
export type TDialogButtonOption = Partial<{
  type: string
  plain: boolean
  size: string
  isLoading: boolean
  key: string
  disabled: boolean
  manualClose: boolean
  async: boolean
  label: string
}>
