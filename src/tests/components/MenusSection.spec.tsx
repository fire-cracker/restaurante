import React, { RefObject } from 'react'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import MenusSection from '../../components/Menus'
import { IMenu } from '../../types/menusTypes'
import { menus } from '../mocks/menus.mock'

jest.mock('../../utils/axiosConfig')
jest.mock('../../redux/actions/menus')

const createMockStore = configureMockStore([thunk])

const store = createMockStore({})

interface IProps {
  menuRef?: RefObject<HTMLInputElement>
  getMenus: () => Promise<{ menus: IMenu[]; count: number }>
  menus?: IMenu[]
}
describe('Header', () => {
  const defaultProps: IProps = {
    menuRef: React.createRef(),
    getMenus: jest.fn().mockResolvedValue({menus}),
    menus: menus
  }

  const setup = (newProps?: any) => {
    const props = { ...defaultProps, ...newProps }
    return render(
      <Provider store={store}>
        <MenusSection {...props} menus={menus}/>
      </Provider>
    )
  }

  afterAll(() => {
    jest.clearAllMocks()
    cleanup()
  })

  test('renders MenusSection component', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
    const { getByText } = wrapper
    const breakfastLink = getByText('Breakfast')
    expect(breakfastLink).toBeInTheDocument()
    const lunchLink = getByText('Lunch')
    expect(lunchLink).toBeInTheDocument()
    const dinnerLink = getByText('Dinner')
    expect(dinnerLink).toBeInTheDocument()
  })

  test('should render menus if getmenu request it successful', () => {
    const wrapper = setup()
    // wrapper.debug()
  })
})
