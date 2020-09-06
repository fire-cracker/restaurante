import React, { FC, useRef, RefObject } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header'
import LandingPage from './views/LandingPage'
import MenusSection from './components/Menus'
import ReservationPage from './views/ReservationPage'

const App: FC = () => {
  const [modalShow, setModalShow] = React.useState(false)
  const menuRef: RefObject<any> = useRef(null)
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

  const onModalShow = (history: any) => {
    setModalShow(true)
    history.push('/home/login ')
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Container fluid className='p-0'>
        <Header executeScrollToMenu={executeScroll} onModalShow={onModalShow}/>
        <Switch>
          <Route path='/home' render={(props) => <LandingPage {...props} menuRef={menuRef} modalShow={modalShow} onModalHide={() => setModalShow(false)} />} />
          <Route exact path='/home/menu' render={() => <MenusSection menuRef={menuRef} />} />
          <Route exact path='/reservation' render={() => <ReservationPage />} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
