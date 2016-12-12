import _ from 'mudash'

const generateHigherOrders = _.memoize((modules) => {
  return _.reduce(modules, (higherOrders, module) => {
    const { createHigherOrder } = module
    if (_.isFunction(createHigherOrder)) {
      const higherOrder = createHigherOrder()
      if (_.isFunction(higherOrder)) {
        return _.push(higherOrders, higherOrder)
      }
    }
    return higherOrders
  }, _.im([]))
})

export default generateHigherOrders
