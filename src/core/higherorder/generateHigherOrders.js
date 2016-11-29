import _ from 'mudash'
export default function generateHigherOrders(state, modules) {
  return _.reduce(modules, (higherOrders, module) => {
    if (_.isFunction(_.get(module, 'createHigherOrder'))) {
      const higherOrder = module.createHigherOrder(state, modules)
      if (_.isFunction(higherOrder)) {
        return _.push(higherOrders, higherOrder)
      }
    }
    return higherOrders
  }, _.im([]))
}
