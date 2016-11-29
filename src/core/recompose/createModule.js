import _ from 'mudash'
import moduleEquals from './moduleEquals'

const createModule = (
  baseModule,
  state,
  ...rest
) => {
  let nextModule = null
  let module = null
  if (_.isFunction(baseModule)) {
    nextModule = {
      state,
      ...baseModule(state, ...rest),
    }
  } else {
    nextModule = {
      state,
      ...baseModule
    }
  }
  module = moduleEquals(module, nextModule) ? module : nextModule
  return module
}

export default createModule
