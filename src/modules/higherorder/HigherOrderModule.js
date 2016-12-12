import _ from 'mudash'
import { applyHigherOrder, defaultState, generateHigherOrders, getModules, mapState, setName, withHooks } from '../../module'

const build = _.compose(
  setName('higherorder'),
  getModules(),
  mapState(({ modules }) => ({
    higherOrders: generateHigherOrders(modules)
  }),
  defaultState({
    higherOrders: _.im([])
  }),
  withHooks({
    createEnhancer: ({ higherOrders }) => () => {
      return applyHigherOrder(...higherOrders)
    }
  })
)

export default build()
