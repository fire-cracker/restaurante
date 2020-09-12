import React, { RefObject } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LandingPage from '../../views/LandingPage'

const createMockStore = configureMockStore([thunk])
const store = createMockStore({})

interface Props {
  menuRef: RefObject<HTMLInputElement>
}

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' })
}))

describe('LandingPage', () => {
  const props: Props = {
    menuRef: React.createRef()
  }

  let wrapper: any
  beforeAll(() => {
    wrapper = render(
      <Provider store={store}>
        <LandingPage {...props} />
      </Provider>
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  test('renders App component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
