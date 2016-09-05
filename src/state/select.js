import _ from 'mudash'

const selectorDefault = (...args) => {
  if (args.length === 0) {
    return undefined
  }
  if (args.length === 1) {
    return args[0]
  }
  return args
}
export default function select(keys, selector) {
  return (state) => {
    if (_.isString(keys)) {
      keys = [keys]
    }
    const args = _.map(keys, (key) => _.get(state, key))
    if (!_.isFunction(selector)) {
      selector = selectorDefault
    }
    return selector(...args)
  }
}
