export interface IUserInfoItem {
  age: number
  gender: string
  level: number
  auth: string
  portrait: string
  userId: string
  userName: string
}

export interface IuserInfo {
  token?: string
  userInfo?: IUserInfoItem
}

export interface IMenuList {
  title: string
  path: string
  icon?: string
  children?: Array<IMenuList>
}

export interface IUserStore {
  userInfo: IuserInfo
  isCollapse: boolean
  routeMenuList: Array<IMenuList>
}
