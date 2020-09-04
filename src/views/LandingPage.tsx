import React from 'react'
import Container from 'react-bootstrap/Container'
import Banner from '../components/Banner'
import Menus from '../components/Menus'

const LandingPage: React.FC = () => {
  return (
      <Container fluid className='p-0'>
        <Banner />
        <Menus />
      </Container>
  )
}

export default LandingPage
