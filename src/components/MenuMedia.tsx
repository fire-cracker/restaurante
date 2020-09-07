import React, { FC, ReactElement } from 'react'
import Col from 'react-bootstrap/Col'
import Media from 'react-bootstrap/Media'

interface IProps {
  imageUrl: string
  name: string
  price: number
  recipe: string
}

const MenuMedia: FC<IProps> = ({ imageUrl, name, price, recipe }): ReactElement => (
  <Col lg={6} className="media-col mb-5">
    <Media>
      <img width={200} height={150} className="mr-3" src={imageUrl} alt={name} />
      <Media.Body className="pt-1">
        <h5 className="mb-3 pb-2 d-flex flex-row justify-content-between">
          {name} <span className="text-darkkhaki">${price}</span>
        </h5>
        <p>{recipe}</p>
      </Media.Body>
    </Media>
  </Col>
)

export default MenuMedia
