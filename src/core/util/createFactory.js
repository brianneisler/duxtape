import createModule from './createModule'

const createFactory = baseModule => {
  //TODO BRN: Add memoization
  return (state, ...rest) =>
    createModule(baseModule, state, ...rest)
}

export default createFactory
