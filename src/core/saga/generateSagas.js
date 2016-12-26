import _ from 'mudash'

const generateSagas = _.memoize((modules) => {
  return _.reduce(modules, (sagas, module) => {
    const { createSaga } = module
    if (_.isFunction(createSaga)) {
      const saga = createSaga()
      if (saga) {
        return _.push(sagas, saga)
      }
    }
    return sagas
  }, _.im([]))
})

export default generateSagas
