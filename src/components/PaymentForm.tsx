import React, { FC, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Token, StripeError } from '@stripe/stripe-js'
import ClipLoader from 'react-spinners/ClipLoader'

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

interface IProps {
  reservation: any
  addReservation: (reservation: any, stripeToken: any) => any
}

const PaymentForm: FC<IProps> = ({ reservation, addReservation }) => {
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [receiptUrl, setReceiptUrl] = useState('')
  const elements = useElements()
  const stripe = useStripe()

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setProcessing(true)
    const cardElement = elements.getElement(CardElement)
    const result = (await stripe.createToken(cardElement!)) as {
      token: Token
      error: StripeError
    }

    if (result.error) {
      setError(result.error.message!)
    } else {
      setError('')
      const stripeCharge = await addReservation(reservation, result.token.id)
      if (stripeCharge) {
        setReceiptUrl(stripeCharge.receipt_url)
      } else {
        setError('Payment failed')
      }
    }
    setProcessing(false)
  }

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt </a>
      </div>
    )
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button disabled={processing || disabled} id="submit">
        <span id="button-text">
          {processing ? <ClipLoader size={30} color={'#00acc1'} loading={true} /> : 'Pay'}
        </span>
      </button>
      {error && (
        <div className="card-errors" role="alert">
          {error}
        </div>
      )}
    </form>
  )
}

export default PaymentForm
