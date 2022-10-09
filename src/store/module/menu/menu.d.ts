interface IChildren {
  title: string
  index: string
  auth?: number
  children?: Array<IChildren>
}

interface IMenu {
  title: string
  index: string
  auth?: number
  icon?: string
  children?: Array<IChildren>
}

export { IChildren, IMenu }
