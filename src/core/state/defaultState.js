import _ from 'mudash'
import { createHelper } from '../util'
import mapState from './mapState'

const defaultState = input =>
  mapState((state, ...rest) => _.assoc(
    (
      _.isFunction(input)
        ? input(state, ...rest)
        : input
    ),
    state
  ))

export default createHelper(defaultState, 'defaultState')
