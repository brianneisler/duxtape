import _ from 'mudash'
export default function generateEnhancers(modules) {
  return _.reduce(modules, (enhancers, module) => {
    const { createEnhancer, enhancer } = module
    if (_.isFunction(createEnhancer)) {
      return _.push(enhancers, createEnhancer(modules))
    } else if (_.isFunction(enhancer)) {
      return _.push(enhancers, enhancer)
    }
    return enhancers
  }, [])
}
