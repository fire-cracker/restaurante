export interface IMenu {
  id: number
  name: string
  image: string
  price: number
  recipe: []
  type: string
}

export interface IMenuState {
  menus: IMenu | null
  count: number
  fetching: boolean
  fetched: boolean
}
