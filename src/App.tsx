import React, { FC, useRef, RefObject, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
// import { ToastContainer } from 'react-toastify'

import Header from './components/Header'
import LoginPage from './components/LoginPage'
import LandingPage from './views/LandingPage'
import ReservationPage from './views/ReservationPage'
import PaymentPage from './views/Checkout'
import { IRootState } from './redux/reducers'
import { IUser, IUserState } from './types/usersTypes'
import { setLoggedInState, getUserProfile } from './redux/actions/users'

interface Props {
  userState: IUserState
  setLoggedInState: (user: IUser) => void
  getUserProfile: (id: string) => any
}

const App: FC<Props> = ({ setLoggedInState, getUserProfile, userState }) => {
  const [modalShow, setModalShow] = useState(false)
  const [reservation, setReservation] = useState(null)
  const menuRef: RefObject<any> = useRef(null)

  useEffect(() => {
    if (!userState.isLoggedIn && localStorage.token) {
      const { token } = localStorage

      let id = ''
      try {
        ;({ id } = JSON.parse(window.atob(token.split('.')[1])))
      } catch (error) {
        localStorage.clear()
      }

      if (id) {
        const setUserState = async () => {
          const user = await getUserProfile(id)
          if (user) await setLoggedInState(user)
          else {
            localStorage.clear()
          }
        }
        setUserState()
      }
    }
  }, [getUserProfile, setLoggedInState, userState])

  const scrollToRef = (history: any, ref: any) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else {
      history.push('/menu')
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }

  const executeScroll = (history: any) => {
    scrollToRef(history, menuRef)
  }

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Container fluid className="p-0">
        <Header executeScrollToMenu={executeScroll} onModalShow={() => setModalShow(true)} />
        <LoginPage show={modalShow} onHide={() => setModalShow(false)} />
        <Switch>
          <Route
            exact
            path="/reservation"
            render={props => (
              <ReservationPage
                {...props}
                setReservation={setReservation}
                onModalShow={() => setModalShow(true)}
              />
            )}
          />
          <Route
            exact
            path="/checkout"
            render={props => <PaymentPage {...props} reservation={reservation} />}
          />
          <Route path="/:id?" render={props => <LandingPage {...props} menuRef={menuRef} />} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = { setLoggedInState, getUserProfile }

export default connect(mapStateToProps, mapDispatchToProps)(App)
