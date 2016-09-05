import _ from 'mudash'

export default function assoc(mapped) {
  return (state) => {
    return _.assoc(state, _.reduce(mapped, (reduction, value, key) => {
      if (_.isFunction(value)) {
        return _.assoc(mapped, key, value(state))
      }
      return _.assoc(mapped, key, value)
    }, mapped))
  }
}
