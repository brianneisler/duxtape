import _ from 'mudash'

export default function composeEnhancer(state, modules) {
  return _.reduce(modules, (enhancer, module) => {
    if (_.isFunction(_.get(module, 'composeEnhancer'))) {
      return module.composeEnhancer(enhancer, state, modules)
    }
    return enhancer
  }, _.identity)
}
