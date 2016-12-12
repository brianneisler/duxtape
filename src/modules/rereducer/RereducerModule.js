import _ from 'mudash'
import { createRereducerHigherOrder, defaultState, generateRereducers, getModules, mapState, setName, withHooks } from '../../module'

const build = _.compose(
  setName('rereducers'),
  getModules(),
  mapState(({ modules }) => ({
    rereducers: generateRereducers(modules)
  }),
  defaultState({
    rereducers: _.im([])
  }),
  withHooks({
    createHigherOrder: ({ rereducers }) => () => {
      return createRereducerHigherOrder(...rereducers)
    }
  })
)

export default build()
