import React, { ReactElement } from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Footer = (): ReactElement => (
  <Jumbotron
    fluid
    className="p-0 mb-0 footer-wrapper d-flex justify-content-center align-items-center">
    <Container fluid>
      <Row className="footer-banner">
        <Row className="text-white px-3 mx-auto">
          <Col className="p-0 d-flex flex-column justify-content-center align-items-center">
            <div className="footer-text-0 text-darkkhaki">
              <h3>Restauranté</h3>
            </div>
            <div className="footer-text-1 text-center text-dimgray">
              <p className="font-weight-normal mb-0">
                Maryland, South Estate HQ 24 Fifth st., Los Angeles, Nigeria
              </p>
              <p className="font-weight-normal mb-0">Phone: (+01) 123 456 7890</p>
              <p className="font-weight-normal mb-0">info@example.com</p>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  </Jumbotron>
)

export default Footer
