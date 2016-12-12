export default function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type
  const actionName = actionType && `"${actionType.toString()}"` || 'an action'

  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state.`
  )
}
