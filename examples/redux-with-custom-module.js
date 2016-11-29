import { createStore } from 'duxtape'
import { enhancer, higherOrder, middleware, reducer, rereducer, saga, selector } from 'duxtape/modules'

const store = createStore([
  enhancer,
  reducer,
  middleware,
  higherOrder,
  rereducer,
  selector,
  saga
])
