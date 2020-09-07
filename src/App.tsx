import React, { FC, useRef, RefObject, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import Header from './components/Header'
import LandingPage from './views/LandingPage'
import MenusSection from './components/Menus'
import ReservationPage from './views/ReservationPage'
import { IRootState } from './redux/reducers'
import { IUser, IUserState } from './types/usersTypes'
import { setLoggedInState, getUserProfile } from './redux/actions/users'

interface Props {
  userState: IUserState
  setLoggedInState: (user: IUser) => void
  getUserProfile: (id: string) => any
}

const App: FC<Props> = ({ userState, setLoggedInState, getUserProfile }) => {
  const [modalShow, setModalShow] = React.useState(false)
  const menuRef: RefObject<any> = useRef(null)

  useEffect(() => {
    if (localStorage.token) {
      const { token } = localStorage

      let id: string = ''
      try {
        ({ id } = JSON.parse(window.atob(token.split('.')[1])))
      } catch (error) {
        localStorage.clear()
      }

      if (id) {
        const setUserState = async() => {
          const user = await getUserProfile(id)
          if (user) await setLoggedInState(user)
          else {
            localStorage.clear()
          }
        };
        setUserState()
      }
    }
  }, [getUserProfile, setLoggedInState])

  const scrollToRef = (history: any, ref: any) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else {
      history.push('/home/menu')
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }

  const executeScroll = (history: any) => {
    scrollToRef(history, menuRef)
  }

  const onModalShow = () => {
    setModalShow(true)
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Container fluid className='p-0'>
        <Header executeScrollToMenu={executeScroll} onModalShow={onModalShow} />
        <Switch>
          <Route path='/home' render={(props) => <LandingPage {...props} menuRef={menuRef} modalShow={modalShow} onModalHide={() => setModalShow(false)} />} />
          <Route exact path='/home/menu' render={() => <MenusSection menuRef={menuRef} />} />
          <Route exact path='/reservation' render={() => <ReservationPage />} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: IRootState) => ({ userState: state.userState })
const mapDispatchToProps = { setLoggedInState, getUserProfile }

export default connect(mapStateToProps, mapDispatchToProps)(App)
