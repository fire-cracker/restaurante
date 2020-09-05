import React, { FC, RefObject } from 'react'
import { RouteComponentProps } from 'react-router'
import Container from 'react-bootstrap/Container'

import Banner from '../components/Banner'
import MenusSection from '../components/Menus'

interface Props extends RouteComponentProps {
  menuRef: RefObject<HTMLInputElement>
}
const LandingPage: FC<Props> = ({ menuRef }) => {
  return (
    <Container fluid className='home-wrapper p-0'>
      <Banner />
      <MenusSection menuRef={menuRef} />
    </Container>
  )
}

export default LandingPage
