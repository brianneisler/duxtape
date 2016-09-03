import _ from 'mudash'

export default function mapReducers(mapped) {
  return (previous, ...args) => {
    return _.reduce(mapped, (current, reducer, path) => {
      const currentPart = _.get(current, path)
      const nextPart = reducer(current, ...args)
      if (_.isEqual(currentPart, nextPart)) {
        return current
      }
      return _.assoc(current, path, nextPart)
    }, previous)
  }
}
