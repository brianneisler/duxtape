import _ from 'mudash'

export default function reduceReducers(...reducers) {
  return (previous, ...args) =>
    _.reduce(reducers,
      (current, reducer) => reducer(current, ...args),
      previous
    )
}
