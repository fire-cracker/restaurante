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

export interface IReservationState {
  reservation: IReservation | null
  fetching: boolean
  fetched: boolean
}
