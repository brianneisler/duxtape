import _ from 'mudash'
import createHelper from './createHelper'
import mapState from './mapState'

const withStateOnChange = input =>
  mapState((state, ...rest) => _.assoc(
    state,
    (
      _.isFunction(input)
        ? input(state, ...rest)
        : input
    )
  ))

export default createHelper(withState, 'withState')
