import _ from 'mudash'
import { ActionTypes } from '../actions'
import { warning } from '../util'
import { assertReducerSanity, getUndefinedStateErrorMessage, getUnexpectedStateShapeWarningMessage } from './util'

const NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : 'development'


/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object | Immutable.Map} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
export default function combineReducers(reducers) {
  const finalReducers = _.reduce(reducers, (final, reducer, key) => {
    if (NODE_ENV !== 'production') {
      if (typeof reducer === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducer === 'function') {
      return _.set(final, key, reducer)
    }
    return final
  }, _.hintConvert(reducers, {}))

  let unexpectedKeyCache
  if (NODE_ENV !== 'production') {
    unexpectedKeyCache = _.im({})
  }

  let sanityError
  try {
    assertReducerSanity(finalReducers)
  } catch (e) {
    sanityError = e
  }

  return function combination(state = {}, action) {
    if (sanityError) {
      throw sanityError
    }

    if (NODE_ENV !== 'production') {
      const unexpectedKeys = _(state).keys().filter(key =>
        !_.has(finalReducers, key) &&
        !_.has(unexpectedKeyCache, key)
      )
      _.each(unexpectedKeys, key => {
        unexpectedKeyCache = _.set(unexpectedKeyCache, key, true)
      })
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeys)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    //TODO BRN: This might be sped up using withMutations
    return _.reduce(finalReducers, (nextState, reducer, key) => {
      const previousStateForKey = _.get(state, key)
      const nextStateForKey = reducer(previousStateForKey, action)
      if (_.isUndefined(nextStateForKey)) {
        throw new Error(getUndefinedStateErrorMessage(key, action))
      }
      if (!_.eq(nextStateForKey, previousStateForKey)) {
        nextState = _.set(nextState, key, nextStateForKey)
      }
      return nextState
    }, state)
  }
}
