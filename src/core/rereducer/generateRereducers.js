import _ from 'mudash'

const generateRereducers = _.memoize((modules) => {
  return _.reduce(modules, (rereducers, module) => {
    const { createRereducer } = module
    if (_.isFunction(createRereducer)) {
      const rereducer = createRereducer()
      if (rereducer) {
        return _.push(rereducers, rereducer)
      }
    }
    return rereducers
  }, _.im([]))
})

export default generateRereducers
