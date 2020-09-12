import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Token } from '@stripe/stripe-js'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {}
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

interface IProps {
  reservation: any
  history: any
  addReservation: (reservation: any, stripeToken: any) => any
}

const PaymentForm: FC<IProps> = ({ history, reservation, addReservation }) => {
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const elements = useElements()
  const [receiptUrl, setReceiptUrl] = useState('')
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
    const {
      token: { id: stripeToken }
    } = (await stripe.createToken(cardElement!)) as { token: Token }
    // const reservation = {
    //   date: '8/31/2020',
    //   persons: 2,
    //   time: '15:00',
    //   type: 'dinner'
    // }

    if (stripeToken) {
      const stripeCharge = await addReservation(reservation, stripeToken)
      if (stripeCharge) {
        setReceiptUrl(stripeCharge.receipt_url)
        setProcessing(false)
      } else {
        setError('Payment failed')
        setProcessing(false)
      }
    }
  }
  console.log('receiptUrl>>>>>', receiptUrl)
  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/home">Home</Link>
      </div>
    )
  }
  // console.log('sdata>>>>>', data)
  return (
    <Jumbotron fluid className="p-0">
      <Container fluid>
        <Row className="top-banner"></Row>
        <Row className="reservation-wrapper px-0">
          <Container className="container-body d-flex flex-column justify-content-center align-items-center">
            <form className="payment-form" onSubmit={handleSubmit}>
              {/* <p>Amount: ${reservation.price}</p> */}
              <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
              <button disabled={processing || disabled} id="submit">
                <span id="button-text">
                  {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
                </span>
              </button>
              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className="card-error" role="alert">
                  {error}
                </div>
              )}
              <p className={'result-message'}>
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a>{' '}
                Refresh the page to pay again.
              </p>
            </form>
          </Container>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default PaymentForm
