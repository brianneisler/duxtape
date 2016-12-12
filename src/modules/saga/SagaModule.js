import _ from 'mudash'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { Driver, select } from '@moltres/drivers/driver'

@select({
  sagas: (sagas) => ({sagas})
})
export default class SagasDriver extends Driver {

  constructor(info, context) {
    super(info, context)
    this.sagaMiddleware = null
  }

  createMiddleware() {
    this.sagaMiddleware = createSagaMiddleware()
    return this.sagaMiddleware
  }

  createState(state, drivers) {
    return _.assoc(state, {
      sagas: this.generateSagas(state, drivers)
    })
  }

  generateSagas(state, drivers) {
    return _.reduce(drivers, (sagas, driver) => {
      if (_.isFunction(_.get(driver, 'createSaga'))) {
        const saga = driver.createSaga(state, drivers)
        if (saga) {
          return _.push(sagas, saga)
        }
      }
      return sagas
    }, _.im([]))
  }

  init() {
    const sagas = _.get(this.state, 'sagas')
    const sagaMiddleware = this.sagaMiddleware
    //TODO BRN: Figure out how to stop and restart this on saga change
    sagaMiddleware.run(buildRootSaga(sagas))
  }
}



import _ from 'mudash'
import { createRereducerHigherOrder, defaultState, generateRereducers, getModules, mapState, setName, withHooks } from '../../module'

const build = _.compose(
  setName('sagas'),
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
