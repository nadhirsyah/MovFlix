import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import MoviesList from '../pages/MoviesList'

Enzyme.configure({ adapter: new EnzymeAdapter() })
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<MoviesList {...props} match={{ params: { id: 1 } }} />)
  if (state) wrapper.setState(state)
  return wrapper
}
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}
describe('test movies list', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup()
  })
  it('renders without error', () => {
    const moviesListComponent = findByTestAttr(wrapper, 'movies-list')
    expect(moviesListComponent.length).toBe(1)
  })
})
