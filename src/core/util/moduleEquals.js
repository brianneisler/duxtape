import _ from 'mudash'
export default function moduleEquals(module, otherModule) {
  //TODO BRN: Not sure this is right
  return _.isShallowEqual(module, otherModule)
}
