export interface IUser {
  id: string
  username: string
  email: string
  role: 'customer' | 'admin'
}

export interface IUserState {
  user: IUser | null
  logingIn: boolean
  isLoggedIn: boolean
}