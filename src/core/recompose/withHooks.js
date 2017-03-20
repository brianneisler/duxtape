import createFactory from './createFactory'
import createHelper from './createHelper'

const withHooks = hooks => baseModule => {
  const factory = createFactory(baseModule)
  return (state, ...rest) => factory(stateMapper(state, ...rest), ...rest)
}

export default createHelper(withHooks, 'withHooks')
