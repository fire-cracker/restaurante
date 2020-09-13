import React, { FC, useEffect, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import Row from 'react-bootstrap/Row'
import Wrapper from '../components/Wrapper'
import { addReservation } from '../redux/actions/reservations'
import PaymentForm from '../components/PaymentForm'
import { INewReservation, IStripeCharge } from '../types/reservationsTypes'

const stripeKey = process.env.REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripeKey || '')

interface IProps extends RouteComponentProps {
  reservation: INewReservation | null
  addReservation: (reservation: INewReservation, stripeToken: string) => Promise<IStripeCharge>
}

const Checkout: FC<IProps> = ({ history, reservation, addReservation }): ReactElement => {
  if (reservation === null) history.push('/home')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="checkout-form">
      <Wrapper>
        <Row className="checkout-wrapper justify-content-center align-items-center">
          <Elements stripe={stripePromise}>
            <PaymentForm reservation={reservation} addReservation={addReservation} />
          </Elements>
        </Row>
      </Wrapper>
    </div>
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { addReservation }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
