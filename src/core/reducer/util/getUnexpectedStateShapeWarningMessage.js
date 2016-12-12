import _ from 'mudash'
import { ActionTypes } from '../../actions'

export default function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeys) {
  const reducerKeys = _.keys(reducers)
  const argumentName = action && action.type === ActionTypes.INIT ?
    'preloadedState argument passed to createStore' :
    'previous state received by the reducer'

  if (_.size(reducerKeys) === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  if (!_.isPlainObject(inputState) && !_.isImMap(inputState)) {
    return (
      `The ${argumentName} has unexpected type of "` +
      ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
      `". Expected argument to be an object or Immutable.Map with the following ` +
      `keys: "${_.join(reducerKeys, '", "')}"`
    )
  }

  if (_.size(unexpectedKeys) > 0) {
    return (
      `Unexpected ${_.size(unexpectedKeys) > 1 ? 'keys' : 'key'} ` +
      `"${_.join(unexpectedKeys, '", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${_.join(reducerKeys, '", "')}". Unexpected keys will be ignored.`
    )
  }
}
