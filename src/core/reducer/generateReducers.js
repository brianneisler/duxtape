import _ from 'mudash'

const generateReducers = _.memoize((modules) => {
  return _.reduce(modules, (reducers, module) => {
    const { createReducer, name } = module
    if (_.isFunction(createReducer)) {
      const reducer = createReducer()
      if (name && reducer) {
        return _.set(reducers, name, reducer)
      }
    }
    return reducers
  }, _.im({}))
})

export default generateReducers
