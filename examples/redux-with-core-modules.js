/* eslint-disable no-console */
const o = require('../') //'duxtape'
const { enhancer, higherOrder, middleware, reducer, rereducer, saga, selector } = o.modules

const store = o.createStore([
  enhancer,
  reducer,
  middleware,
  higherOrder,
  rereducer,
  selector,
  saga
])

console.log('store:', store)
console.log('store.getModules():', store.getModules())
console.log('store.getState():', store.getState())
