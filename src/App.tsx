import React, { FC, useRef, RefObject } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Header from './components/Header/Header'
import LandingPage from './views/LandingPage'
import MenusSection from './components/Menus'

const App: FC = () => {
  const menuRef: RefObject<any> = useRef(null)
  const scrollToRef = (history: any, ref: any) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.push('/menu')
  }
  const executeScroll = (history: any) => {
    scrollToRef(history, menuRef)
  }

  return (
    <BrowserRouter>
      <Container fluid className='p-0'>
        <Header executeScrollToMenu={executeScroll} />
        <Switch>
          <Route exact path='/' render={(props)=> <LandingPage {...props} menuRef={menuRef}/>}/>
          <Route exact path='/menu' render={() => <MenusSection />} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
