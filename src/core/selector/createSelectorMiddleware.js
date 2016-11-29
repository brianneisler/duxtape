export default function createSelectorMiddleware(selectorEngine) {
  return ({getState}) => {
    return next => action => {
      const result = next(action)
      const state = getState()
      selectorEngine.updateState(state)
      return result
    }
  }
}
