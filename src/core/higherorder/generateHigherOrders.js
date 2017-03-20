import _ from 'mudash'

const generateHigherOrders = _.memoize((modules) => {
  return _.reduce(modules, (higherOrders, module) => {
    const { createHigherOrder, higherOrder } = module
    if (_.isFunction(createHigherOrder)) {
      return _.push(higherOrders, createHigherOrder())
    } else if (_.isFunction(higherOrder)) {
      return _.push(higherOrders, higherOrder)
    }
    return higherOrders
  }, _.im([]))
})

export default generateHigherOrders
