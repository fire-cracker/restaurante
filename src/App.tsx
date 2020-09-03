import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Header from './components/Header/Header'
import LandingPage from './views/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Container fluid className='p-0'>
        <Header/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
