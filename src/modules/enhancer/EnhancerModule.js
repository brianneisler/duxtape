import _ from 'mudash'
import { defaultState, generateEnhancers, getModules, mapState, setName, withHooks } from '../../core'

const build = _.compose(
  setName('enhancer'),
  getModules(),
  mapState(({ modules }) => ({
    enhancers: generateEnhancers(modules)
  })),
  defaultState({
    enhancers: _.im([])
  }),
  withHooks({
    composeEnhancer: ({ enhancers }) => enhancer => {
      return _.compose(..._.reverse(enhancers), enhancer)
    }
  })
)

export default build()
