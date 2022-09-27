/// <reference types="vite/client" />

// 任意类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TAny = any

// 泛型对象字典
declare type TDictObject<T> = { [key: string]: T }

// 任意类型对象
declare type TObject = {
  [key: string]: TAny
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
  const classes: { [key: string]: string }
  export default classes
}
