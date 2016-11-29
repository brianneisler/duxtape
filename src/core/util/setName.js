import createFactory from './createFactory'
import createHelper from './createHelper'

const setName = name => baseModule => {
  const factory = createFactory(baseModule)
  return (state, ...rest) => ({
    name,
    ...factory(state, ...rest)
  })
}

export default createHelper(setName, 'setName')
