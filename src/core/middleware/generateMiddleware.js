import _ from 'mudash'

const generateMiddleware = _.memoize((modules) => {
  return _.reduce(modules, (middlewares, module) => {
    const { createMiddleware } = module
    if (_.isFunction(createMiddleware)) {
      const middleware = createMiddleware()
      if (_.isFunction(middleware)) {
        return _.push(middlewares, middleware)
      }
    }
    return middlewares
  }, _.im([]))
})

export default generateMiddleware
