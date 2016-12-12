import _ from 'mudash'
import invariant from 'invariant'
import { createStore } from 'redux'
import { composeEnhancer, composeReducer, factoryModules } from './util'

export default function(initialFactories, initialState = {}) {

  let currentStore      = null
  let currentFactories  = initialFactories
  let currentModules    = {}
  let currentState      = initialState


  function getModules() {
    return currentModules
  }

  function getState() {
    return currentStore.getState()
  }

  function dispatch(action) {
    return currentStore.dispatch(action)
  }


  let currentListeners = _.im([])
  let nextListeners = currentListeners

  function subscribe(listener) {
    if (!_.isFunction(listener)) {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true
    nextListeners = _.push(nextListeners, listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false
      nextListeners = _.pull(nextListeners, listener)
    }
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
    const state = currentStore.getState()
    _.each(currentModules, (module) => {
      if (_.isFunction(_.get(module, 'updateState')) {
        module.updateState(state, dispatch)
      }
    })
  }

  let unsubscribeFromStore
  function isSubscribedToStore() {
    return typeof unsubscribeFromStore === 'function'
  }

  function trySubscribeToStore() {
    if (!isSubscribedToStore()) {
      unsubscribeFromStore = currentStore.subscribe(handleChange)
    }
  }

  function tryUnsubscribeFromStore() {
    if (isSubscribedToStore()) {
      unsubscribeFromStore()
      unsubscribeFromStore = null
    }
  }

  function handleChange() {
    if (!isSubscribedToStore()) {
      return
    }

    const prevState = currentState
    currentState = currentStore.getState()

    if (prevState === currentState) {
      return
    }
    const listeners = currentListeners = nextListeners
    _.each(listeners, (listener) => {
      listener(currentState)
    })

    //updateState()
  }

  function replaceModules(replacementFactories) {
    tryUnsubscribeFromStore()
    generateStore(replacementFactories, currentState)
    trySubscribeToStore()
  }

  function generateStore(factories, state) {
    currentModules = factoryModules(factories, state, {})
    currentStore = createStore(
      composeReducer(state, currentModules),
      state,
      composeEnhancer(state, currentModules)
    )
  }

  generateStore(currentFactories, currentState)
  trySubscribeToStore()

  return {
    ...currentStore,
    dispatch,
    getModules,
    getState,
    replaceModules,
    subscribe
  }
}
