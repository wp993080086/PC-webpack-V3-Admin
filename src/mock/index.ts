import { Random } from 'mockjs'
import './user/index'

// 创建自定义 Mock 函数
Random.extend({
  // 自定义函数名: function 函数
  fruit() {
    const arr = ['榴莲', '波罗蜜', '椰子', '苹果', '菠萝', '释迦']
    return this.pick(arr)
  }
})
