import _ from 'mudash'

const generateEnhancers = _.memoize((modules) => {
  return _.reduce(modules, (enhancers, module) => {
    const { createEnhancer, enhancer } = module
    if (_.isFunction(createEnhancer)) {
      return _.push(enhancers, createEnhancer())
    } else if (_.isFunction(enhancer)) {
      return _.push(enhancers, enhancer)
    }
    return enhancers
  }, _.im([]))
})

export default generateEnhancers
