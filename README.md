# duxtape
*"You can never have enough duxtape for redux."*

Module and util framework for redux.

## Benefits
- Utility methods packaged under one roof for easily building out redux functionality
- Introduces an abstract module construct for redux. Allows modularization of functionality and easy plug and play workflow
- Hook system for extending the functionality of redux
- Provides a framework for building out an entire application (if desired)


## Build Status

[![npm version](https://badge.fury.io/js/duxtape.svg)](https://badge.fury.io/js/duxtape)<br />
[![Build Status](https://travis-ci.org/brianneisler/duxtape.svg)](https://travis-ci.org/brianneisler/duxtape)<br />
[![NPM](https://nodei.co/npm/duxtape.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/duxtape/)


## Documentation

[Full API documentation](docs/API.md) - Learn about each method


## Install

```bash
npm install --save duxtape
```


## Usage

```js
import o from 'duxtape'
import { reducer } from 'duxtape/modules'


const { decrement, increment } = o.createActions({
  DECREMENT: amount => amount,
  INCREMENT: amount => amount
})

const build = o.compose(
  o.setName('inc'), // sets base state path to 'inc'
  o.withActions({
    decrement,
    increment
  }),
  o.defaultState({
    counter: 0
  }),
  o.withReducer(() => o.handleActions({
    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    }),
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    })
  }),
  o.withHooks({
    init: (state) => console.log('module initialized'),
    receiveState: (nextState, state) => console.log('module state received:', nextState)
  })
)

const module = build()

// Order of modules matters, they will be processed in order given
const store = o.createStore([
  reducer,
  module
])

// listen for state changes on all of store
store.subscribe((state) => {
  console.log('store state changed')
  console.log('store state:', state)
})

// listen for state changes on module
module.subscribe((state) => {
  console.log('module state changed')
  console.log('module state:', state)
})

// old school dispatch
store.dispatch({ type: 'INCREMENT', payload: 1 })

// dispatch with action creator
store.dispatch(increment(2))

// dispatch via module
module.decrement(3)

// get store state
console.log(store.getState())

// get module state
console.log(module.getState())
```
