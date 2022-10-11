export interface IMenuList {
  title: string
  path: string
  icon?: string
  children?: Array<IMenuList>
}

export interface IMenuStore {
  isCollapse: boolean
  menuList: Array<IMenuList>
}
