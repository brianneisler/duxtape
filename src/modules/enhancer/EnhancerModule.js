import _ from 'mudash'
import { defaultState, generateEnhancers, mapState, setName, withHooks } from '../../core'

const build = _.compose(
  setName('enhancer'),
  defaultState({
    enhancers: {}
  }),
  mapState((state, modules) => ({
    enhancers: generateEnhancers(modules)
  })),
  withHooks({
    composeEnhancer: state => enhancer => {
      const enhancers = _.get(state, 'enhancers')
      return _.compose(..._.reverse(enhancers), enhancer)
    }
  })
)

export default build()
