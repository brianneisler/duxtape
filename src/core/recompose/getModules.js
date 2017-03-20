import _ from 'mudash'
import createHelper from './createHelper'
import mapState from './mapState'

const getModules = (predicate) =>
  mapState((state, ...rest) => _.assoc(
    state,
    { modules: state.modules }
  ))

export default createHelper(getModules, 'getModules')
