import _ from 'mudash'

export default function createSelectorEngine() {
  let selectors = []
  let prevState

  function add(selector) {
    if (_.indexOf(selectors, selector) === -1) {
      selectors = _.concat(selectors, selector)
    }
  }

  function getAll() {
    return selectors
  }

  function remove(selector) {
    selectors = _.filter(selectors, (x) => x !== selector)
  }

  function updateSelectors(state) {
    //TODO: Fix this
    _.each(selectors, (selector) => selector(prevState, state))
    prevState = state
  }

  function updateState(state) {
    updateSelectors(state)
  }

  return {
    add,
    getAll,
    remove,
    updateState
  }
}
