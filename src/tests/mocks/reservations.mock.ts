export const reservation = {
  date: '8/31/2020',
  persons: 2,
  time: '15:00',
  type: 'dinner'
}

export const stripeCharge = {
  id: 'ch_1HPD9dIqdNTqIhB4vq8BKHNK',
  object: 'charge',
  amount: 2000,
  paid: true,
  receipt_email: 'johndoe@example.com',
  receipt_number: null,
  receipt_url:
    'https://pay.stripe.com/receipts/acct_1ExJ0CIqdNTqIhB4/ch_1HPD9dIqdNTqIhB4vq8BKHNK/rcpt_HzBWOBxRLcx4skpk2Zium88mFJj9Mv7',
  status: 'succeeded'
}

export const newReservation = {
  date: '8/31/2020',
  persons: 2,
  time: '15:00',
  type: 'dinner',
  stripeToken: 'toks_visa'
}

export const invalidReservation = {
  date: '',
  persons: 2,
  time: '15:00',
  type: 'dinner',
  stripeToken: 'toks_visa'
}
export const reservationState = {
  reservation,
  fetching: false,
  fetched: true
}
