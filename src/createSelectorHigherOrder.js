import _ from 'mudash'
import reduceReducers from './reduceReducers'

export default function createSelectorHigherOrder(selectors = []) {
  const selector = reduceReducers(...selectors)
  return reducer => (state, action) => {
    let prevState = state
    state = reducer(state, action)
    while (!_.isEqual(prevState, state)) {
      prevState = state
      state = selector(state)
    }
    return state
  }
}
