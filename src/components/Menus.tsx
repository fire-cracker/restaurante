import React, { FC, RefObject, ReactElement, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import { getMenus } from '../redux/actions/menus'
import { IMenu } from '../types/menusTypes'
import MenuMedia from './MenuMedia'

interface Props {
  menuRef?: RefObject<HTMLInputElement>
  getMenus: () => Promise<{ menus: IMenu[]; count: number }>
}
const MenusSection: FC<Props> = ({ menuRef, getMenus }): ReactElement => {
  const [menus, setMenusState] = useState([] as IMenu[])

  useEffect(() => {
    const fetchData = async () => {
      const { menus } = await getMenus()
      setMenusState(menus)
    }
    fetchData()
  }, [getMenus])

  return (
    <Jumbotron ref={menuRef} fluid className="menu-jumbotron bg-ghostwhite px-0">
      <Container className="menu-container m-auto">
        <Row className="container-wrapper px-0">
          <Tab.Container defaultActiveKey="breakfast">
            <Container className="container-body m-0 d-flex flex-column justify-content-center align-items-center">
              <Row className="menu-header mb-4 flex-column justify-content-center align-items-center">
                <Col>
                  <h4 className="text-darkkhaki">FOOD AT FIRST SIGHT</h4>
                </Col>
                <Col>
                  <h2>Our Restaurant Menu</h2>
                </Col>
                <Col className="divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center">
                  <p className="line my-2 mx-1">&nbsp;</p>
                  <p className="icon">
                    <img src="/images/entwined.svg" alt="entwined" className="fa fa-cutlery"></img>
                  </p>
                  <p className="line my-2 mx-1">&nbsp;</p>
                </Col>
              </Row>
              <Row className="navs-container mb-4 w-100">
                <Nav className="w-100 justify-content-between">
                  <Col lg={3} md={5} className="nav-col p-0">
                    <Nav.Item className="mr-4 mt-1 mb-0 p-0">
                      <Nav.Link className="py-4 px-3 bg-white" eventKey="breakfast">
                        <img src="/images/breakfast.svg" alt="breafast icon" />
                        <p>Breakfast</p>
                      </Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col lg={3} md={5} className="nav-col p-0">
                    <Nav.Item className="mr-4 mt-1 mb-0 p-0">
                      <Nav.Link className="py-4 px-3 bg-white" eventKey="lunch">
                        <img src="/images/lunch.svg" alt="breafast icon" />
                        <p>Lunch</p>
                      </Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col lg={3} md={5} className="nav-col p-0">
                    <Nav.Item className="mr-4 mt-1 mb-0 p-0">
                      <Nav.Link className="py-4 px-3 bg-white" eventKey="dinner">
                        <img src="/images/dinner.svg" alt="breafast icon" />
                        <p>Dinner</p>
                      </Nav.Link>
                    </Nav.Item>
                  </Col>
                  <Col lg={3} md={5} className="nav-col mr-0 p-0">
                    <Nav.Item className="mr-0 mt-1 mb-0 p-0">
                      <Nav.Link className="py-4 px-3 bg-white" eventKey="drink">
                        <img src="/images/drink.svg" alt="breafast icon" />
                        <p>Drinks</p>
                      </Nav.Link>
                    </Nav.Item>
                  </Col>
                </Nav>
              </Row>
              <Row className="menu-body mx-0 pt-5">
                <Tab.Content>
                  {['breakfast', 'lunch', 'dinner', 'drink'].map((item, key) => (
                    <Tab.Pane eventKey={item} key={key}>
                      <Row>
                        {menus
                          .filter(menu => menu.type === item)
                          .map((menu, key) => (
                            <MenuMedia
                              key={key}
                              imageUrl={menu.image}
                              name={menu.name}
                              price={menu.price}
                              recipe={menu.recipe}
                            />
                          ))}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Row>
            </Container>
          </Tab.Container>
        </Row>
      </Container>
    </Jumbotron>
  )
}
const mapStateToProps = () => ({})
const mapDispatchToProps = { getMenus }

export default connect(mapStateToProps, mapDispatchToProps)(MenusSection)
