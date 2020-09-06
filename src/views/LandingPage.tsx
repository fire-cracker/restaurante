import React, { FC, RefObject } from 'react'
import { RouteComponentProps } from 'react-router'
import Container from 'react-bootstrap/Container'

import Banner from '../components/Banner'
import MenusSection from '../components/Menus'
import LoginPage from '../components/LoginPage'

interface Props extends RouteComponentProps {
  menuRef: RefObject<HTMLInputElement>
  modalShow: boolean
  onModalHide: () => any
}
const LandingPage: FC<Props> = ({ menuRef, modalShow, onModalHide }) => {
  return (
    <Container fluid className='home-wrapper p-0'>
      <Banner />
      <MenusSection menuRef={menuRef} />
      <LoginPage show={modalShow} onHide={onModalHide} />
    </Container>
  )
}

export default LandingPage
