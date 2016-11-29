import _ from 'mudash'
import { reduceReducers } from '../reducer'

export default function createRereducerHigherOrder(rereducers = []) {
  const rereducer = reduceReducers(...rereducers)
  return reducer => (state, action) => {
    let prevState = state
    state = reducer(state, action)
    while (!_.isEqual(prevState, state)) {
      prevState = state
      state = rereducer(state)
    }
    return state
  }
}
