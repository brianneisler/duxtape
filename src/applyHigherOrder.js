import _ from 'mudash'

export default function applyHigherOrder(...higherOrders) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    reducer = _.compose(...higherOrders)(reducer)
    return createStore(reducer, preloadedState, enhancer)
  }
}
