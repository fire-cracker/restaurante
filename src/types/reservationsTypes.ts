export interface IReservation {
  id: number
  userId: string
  date: string
  time: string
  type: string
  price: number
  persons: number
  stripeId: string
}
export interface INewReservation {
  date: string
  time: string
  type: string
  persons: number
}

export interface IReservationState {
  reservation: IReservation | null
  fetching: boolean
  fetched: boolean
}
