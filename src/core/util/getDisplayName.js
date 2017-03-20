import _ from 'mudash'

const getDisplayName = value => {
  if (_.isString(value)) {
    return value
  }

  if (!value) {
    return undefined
  }

  return value.displayName || value.name || 'Module'
}

export default getDisplayName
