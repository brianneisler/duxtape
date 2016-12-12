import _ from 'mudash'
import { applyMiddleware, defaultState, generateMiddleware, getModules, mapState, setName, withHooks } from '../../module'

const build = _.compose(
  setName('middleware'),
  getModules(),
  mapState(({ modules }) => ({
    middlewares: generateMiddleware(modules)
  }),
  defaultState({
    middlewares: _.im([])
  }),
  withHooks({
    createEnhancer: ({ middlewares }) => () => {
      return applyMiddleware(...middlewares)
    }
  })
)

export default build()
