import _ from 'mudash'
import wrapDisplayName from './wrapDisplayName'

const createHelper = (
  func,
  helperName,
  setDisplayName = true
) => {
  if (process.env.NODE_ENV !== 'production' && setDisplayName) {
    return (...args) => _.compose(
      func(...args),
      wrapDisplayName(helperName)
    )
  }

  return func
}

export default createHelper
