import React from 'react'
import { render } from '@testing-library/react'

import MenuMedia from '../../components/MenuMedia'

interface IProps {
  imageUrl: string
  name: string
  price: number
  recipe: string
}

describe('MenuMedia', () => {
  const props: IProps = {
    imageUrl: '',
    name: 'Jollof rice',
    price: 300,
    recipe: 'green pepper'
  }

  let wrapper: any
  beforeEach(() => {
    wrapper = render(<MenuMedia {...props} />)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders MenuMedia component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('renders menu name', () => {
    const menuName = wrapper.getByText('Jollof rice')
    expect(menuName).toBeInTheDocument()
  })

  test('renders menu price', () => {
    const menuPrice = wrapper.getByText('$300')
    expect(menuPrice).toBeInTheDocument()
  })

  test('renders menu recipe', () => {
    const menuRecipe = wrapper.getByText('green pepper')
    expect(menuRecipe).toBeInTheDocument()
  })
})
