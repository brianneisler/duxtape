import _ from 'mudash'
import { createHelper } from '../util'
import mapState from './mapState'

const withState = input =>
  mapState((state, ...rest) => _.assoc(
    state,
    (
      _.isFunction(input)
        ? input(state, ...rest)
        : input
    )
  ))

export default createHelper(withState, 'withState')
