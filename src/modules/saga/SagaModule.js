// import _ from 'mudash'
// import createSagaMiddleware from 'redux-saga'
// import { fork } from 'redux-saga/effects'
// import { Driver, select } from '@moltres/drivers/driver'
//
// @select({
//   sagas: (sagas) => ({sagas})
// })
// export default class SagasDriver extends Driver {
//
//   constructor(info, context) {
//     super(info, context)
//     this.sagaMiddleware = null
//   }
//
//   createMiddleware() {
//     this.sagaMiddleware = createSagaMiddleware()
//     return this.sagaMiddleware
//   }
//
//   createState(state, drivers) {
//     return _.assoc(state, {
//       sagas: this.generateSagas(state, drivers)
//     })
//   }
//
//
//   init() {
//     const sagas = _.get(this.state, 'sagas')
//     const sagaMiddleware = this.sagaMiddleware
//     //TODO BRN: Figure out how to stop and restart this on saga change
//     sagaMiddleware.run(buildRootSaga(sagas))
//   }
// }
//


import _ from 'mudash'
import { createSagaMiddleware, defaultState, generateSagas, getModules, mapState, setName, withHooks, withStateOnChange } from '../../module'

const build = _.compose(
  getModules('createSaga'), // uses '_.filter' under the hood looking for modules that have the 'createSaga' hook
  withStateOnChange(['modules'], ({ modules }) => ({ // Uses _.eq under the hood and modules is an immutable list. So if modules are shallow equal then this will not rerun
    sagas: generateSagas(modules)
  })),
  withHooks({
    createMiddleware: () => createSagaMiddleware() //TODO BRN: Hooks should be auto memoized under the hood
  })
)

export default build(() => {

})
