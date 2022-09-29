/// <reference types="vite/client" />

// 任意类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TAny = any

// 任意类型对象
declare type TDict<T = TAny> = {
  [key: string]: T
}

// 任意函数
declare type TFunc<T = TAny> = (...args: T[]) => T

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, TAny>
  export default component
}

declare module '*.module.scss' {
  const classes: TDict<string>
  export default classes
}
