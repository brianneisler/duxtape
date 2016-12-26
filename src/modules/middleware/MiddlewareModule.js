import _ from 'mudash'
import { applyMiddleware, defaultState, generateMiddleware, getModules, mapState, setName, select, withHooks, withStateOnChange } from '../../module'

const build = _.compose(
  setName('middleware'),
  getModules('createMiddleware'), // uses '_.filter' under the hood looking for modules that have the 'createMiddleware' hook
  withStateOnChange(['modules'], ({ modules }) => ({ // Uses _.eq under the hood and modules is an immutable list. So if modules are shallow equal then this will not rerun
    middlewares: generateMiddleware(modules)
  }),
  defaultState({
    middlewares: _.im([])
  }),
  withHooks({
    createEnhancer: select( // Uses memoization and _.eq under the hood and middlewares is an immutable list. So if middlewares is shallow equal then this will return same result
      ['middlewares'],
      (middlewares) => applyMiddleware(...middlewares)
    )
  })
)

export default build()
