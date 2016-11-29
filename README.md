# duxtape
Can never have enough duxtape for redux.

Module and util framework for redux.

## Benefits
- Introduces an abstract module construct for redux. Allows modularization of functionality and easy plug and play workflow
- Hook system for extending the functionality of redux
- Utility methods packaged under one roof for easily building out redux modules
- Provides a framework for building out an entire application (if desired)

## Build Status

[![npm version](https://badge.fury.io/js/duxtape.svg)](https://badge.fury.io/js/duxtape)<br />
[![Build Status](https://travis-ci.org/brianneisler/duxtape.svg)](https://travis-ci.org/brianneisler/duxtape)<br />
[![NPM](https://nodei.co/npm/duxtape.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/duxtape/)


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
  console.log('store state changed:')
  console.log('store state:', store.getState())
  console.log('module state:', module.getState())
)

// old school dispatch
store.dispatch({ type: 'INCREMENT', payload: 1 })

// dispatch with action creator
store.dispatch(increment(2))

// dispatch via module
module.decrement(3)
```
