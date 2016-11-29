import o from '../'  //'duxtape'
import { reducer } from '../modules' //'duxtape/modules'


const { decrement, increment } = o.createActions({
  DECREMENT: amount => amount,
  INCREMENT: amount => amount
})


const build = o.compose(
  o.setName('inc'),
  o.withActions({
    decrement,
    increment
  }),
  o.defaultState({
    counter: 0
  }),
  o.withReducer(() => o.handleActions({
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  }),
  o.withHooks({
    init: () => console.log('module initialized'),
    receiveState: (state) => console.log('module state change:', state)
  })
)

const module = build()

// Order of modules matters
const store = o.createStore([
  reducer,
  module
])

// listen for state changes on all of store
store.subscribe(() =>
  console.log('store state change:', store.getState())
)

// old school dispatch
store.dispatch({ type: 'INCREMENT', payload: 1 })

// dispatch with action creater
store.dispatch(increment(2))

// dispatch via module
module.decrement(3)
