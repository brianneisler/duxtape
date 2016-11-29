import _ from 'mudash'
import { defaultState, mapState, setName } from '../../module'
import { generateHigherOrders } from '../../utils'

const build = _.compose(
  setName('higherorder'),
  defaultState({
    higherOrders: []
  }),
  mapState((state, modules) => ({
    higherOrders: generateHigherOrders(state, modules)
  })
)

export default build((state) => ({
  createEnhancer: () => {
    const higherOrders = _.get(state, 'higherOrders')
    return applyHigherOrder(...higherOrders)
  }
}))
