import _ from 'mudash'

export default function composeReducer(state, modules) {
  return _.reduce(modules, (reducer, module) => {
    if (_.isFunction(_.get(module, 'composeReducer'))) {
      return module.composeReducer(reducer, state, modules, store)
    }
    return reducer
  }, _.identity)
}
