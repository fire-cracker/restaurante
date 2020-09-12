export interface IReservation {
  id: number
  userId: string
  date: string
  time: string
  type: string
  price: number
  persons: number
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

export interface IStripeCharge {
  id: string
  object: string
  amount: 2000
  paid: boolean
  receipt_email: string
  receipt_number: string
  receipt_url: string
  status: string
}
