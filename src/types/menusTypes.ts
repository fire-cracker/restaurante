export interface IMenu {
  id: number
  name: string
  image: string
  price: number
  recipe: string
  type: string
}

export interface IMenuState {
  menus: IMenu | null
  count: number
  fetching: boolean
  fetched: boolean
}
