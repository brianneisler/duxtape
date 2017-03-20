import createFactory from './createFactory'
import createHelper from './createHelper'

const mapState = stateMapper => baseModule => {
  const factory = createFactory(baseModule)
  return (state, ...rest) => factory(stateMapper(state, ...rest), ...rest)
}

export default createHelper(mapState, 'mapState')
