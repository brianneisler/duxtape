import createFactory from './createFactory'
import getDisplayName from './getDisplayName'

const wrapDisplayName = displayName => baseModule => {
  const factory = createFactory(baseModule)
  return (state, ...rest) => {
    const module = factory(state, ...rest)
    return {
      ...module,
      displayName: `${displayName}(${getDisplayName(module)})`
    }
  }
}

export default wrapDisplayName
