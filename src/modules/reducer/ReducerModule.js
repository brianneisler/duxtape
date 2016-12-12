import _ from 'mudash'
import { combineReducers, defaultState, generateReducers, getModules, mapState, setName, withHooks } from '../../core'

const build = _.compose(
  setName('reducer'),
  getModules(),
  mapState(({ modules }) => ({
    reducers: generateReducers(modules)
  })),
  defaultState({
    reducers: _.im({})
  }),
  withHooks({
    composeReducer: ({ reducers }) => reducer => {
      return _.compose(combineReducers(reducers), reducer)
    }
  })
)

export default build()
