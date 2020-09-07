export type IRole = 'customer' | 'admin'

export interface IUser {
  id: string
  username: string
  email: string
  role: IRole
}

export interface IUserState {
  user: IUser | null
  logingIn: boolean
  isLoggedIn: boolean
}
