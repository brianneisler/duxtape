import _ from 'mudash'
import invariant from 'invariant'
import { createStore } from 'redux'
import { composeEnhancer, composeReducer, factoryModules } from './util'

export default function(initialFactories, initialState = {}) {

  let factories         = initialFactories
  let currentModules    = {}
  let currentStore      = null
  let currentState      = initialState

  function getStore() {
    return currentStore
  }

  function getModules() {
    return currentModules
  }

  function dispatch(action) {
    getStore().dispatch(action)
  }

  function createState(state, modules) {
    return _.reduce(_.reverse(modules), (reduction, module) => {
      if (_.isFunction(_.get(module, 'createState'))) {
        return module.createState(modules, reduction)
      }
      return reduction
    }, state)
  }

  function updateState(state) {
    const state = store.getState()
    _.each(currentModules, (module) => {
      if (_.isFunction(_.get(module, 'updateState')) {
        module.updateState(state, dispatch)
      }
    })
  }

  function replaceModules(modules) {
    // const state       = store.getState() TODO BRN: Deal with existing state
    currentModules = modules
    return store.replaceReducer(composeReducer(state, modules))
  }

  let unsubscribe
  function isSubscribed() {
    return typeof unsubscribe === 'function'
  }

  function trySubscribe() {
    if (!isSubscribed()) {
      unsubscribe = store.subscribe(handleChange)
    }
  }

  function tryUnsubscribe() {
    if (isSubscribed()) {
      unsubscribe()
      unsubscribe = null
    }
  }

  function handleChange() {
    if (!isSubscribed()) {
      return
    }

    const prevState = currentState
    const currentState = store.getState()

    if (prevState === currentState) {
      return
    }
    updateState()
  }

  currentModules = factoryModules(factories, currentState, {})
  store = createStore(
    composeReducer(currentState, currentModules),
    currentState,
    composeEnhancer(currentState, currentModules)
  )
  trySubscribe()

  store = {
    ...store,
    dispatch,
    getModules,
    getStore,
    updateStore,
    tryUnsubscribe
  }

  return store
}
