import _ from 'mudash'
import wrapDisplayName from './wrapDisplayName'

const createHelper = (func, helperName, setDisplayName = true, noArgs = false) => {
  if (process.env.NODE_ENV !== 'production' && setDisplayName) {
    if (noArgs) {
      return _.compose(
        func(...args),
        wrapDisplayName(helperName)
      )
    }

    return (...args) => _.compose(
      func(...args),
      wrapDisplayName(helperName)
    )
  }

  return func
}

export default createHelper
