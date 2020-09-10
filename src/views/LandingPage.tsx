import React, { FC, RefObject } from 'react'
import Container from 'react-bootstrap/Container'

import Banner from '../components/Banner'
import MenusSection from '../components/Menus'

interface Props {
  menuRef: RefObject<HTMLInputElement>
}
const LandingPage: FC<Props> = ({ menuRef }) => (
  <Container fluid className="home-wrapper p-0">
    <Banner />
    <MenusSection menuRef={menuRef} />
  </Container>
)

export default LandingPage
