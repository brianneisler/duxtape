import { bindActionCreators } from 'redux'

export default function wrapActions(selector) {
  return (state, dispatch) => bindActionCreators(selector(state, dispatch), dispatch)
}
