import _ from 'mudash'
import { applyHigherOrder, defaultState, generateHigherOrders, getModules, mapState, setName, withHooks } from '../../core'

const build = _.compose(
  getModules(),
  mapState(({ modules }) => ({
    higherOrders: generateHigherOrders(modules)
  })),
  withHooks({
    createEnhancer: ({ higherOrders }) => () => {
      return applyHigherOrder(...higherOrders)
    }
  })
)

export default build()
//
// @select((state) => ({
//   higherOrders: generateHigherOrders(state.modules)
// }))
// export default class HigherOrderModule extends Module {
//   createEnhancer() {
//     return applyHigherOrder(...this.state.higherOrders)
//   }
// }
