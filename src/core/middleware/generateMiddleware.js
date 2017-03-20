import _ from 'mudash'

const generateMiddleware = _.memoize((modules) => {
  return _.reduce(modules, (middlewares, module) => {
    const { createMiddleware, middleware } = module
    if (_.isFunction(createMiddleware)) {
      return _.push(middlewares, createMiddleware())
    } else if (_.isFunction(middleware)) {
      return _.push(middlewares, middleware)
    }
    return middlewares
  }, _.im([]))
})

export default generateMiddleware
