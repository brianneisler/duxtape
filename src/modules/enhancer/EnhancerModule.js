import _ from 'mudash'
import { defaultState, generateEnhancers, getModules, mapState, setName, withHooks } from '../../core'

const build = _.compose(
  getModules(),
  mapState(({ modules }) => ({
    enhancers: generateEnhancers(modules)
  })),
  withHooks({
    composeEnhancer: ({ enhancers }) => enhancer => {
      return _.compose(..._.reverse(enhancers), enhancer)
    }
  })
)

export default build()
