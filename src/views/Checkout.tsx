import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { addReservation } from '../redux/actions/reservations'
import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe('pk_test_s7dzKE4O2saVThp2USNgEFoW00hc0xxPft')

interface IProps extends RouteComponentProps {
  reservation: any
  history: any
  addReservation: (reservation: any, stripeToken: string) => any
}

const Checkout: FC<IProps> = ({ history, reservation, addReservation }) => {
  // if (reservation === null) history.push('/home')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm reservation={reservation} history={history} addReservation={addReservation} />
    </Elements>
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { addReservation }

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
