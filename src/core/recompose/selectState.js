

// import _ from 'mudash'
// import { createSelector } from 'reselect'
//
// const defaultSelectState = state => ({}) // eslint-disable-line no-unused-vars
//
// function buildSelector(selector, defaultSelector) {
//   if (!selector) {
//     return defaultSelector
//   }
//   if (_.isObject(selector)) {
//     const selectors = _.map(selector, (selectMethod, key) => {
//       return (state, dispatch) => selectMethod(_.get(state, key), dispatch)
//     })
//     return createSelector(selectors, (...args) => _.merge(...args))
//   }
//   return selector
// }
//
// // Helps track hot reloading.
// let nextVersion = 0
//
// export default function select(selector) {
//
//   const version = nextVersion++
//
//   return function extendWithSelect(ExtendedDriver) {
//
//     class Select extends ExtendedDriver {
//
//       constructor(...args) {
//         super(...args)
//         this.selectState = buildSelector(selector, defaultSelectState)
//       }
//
//       updateState(state, dispatch) {
//         const nextState = this.selectState(state, dispatch)
//         if (!_.isEqual(nextState, this.state)) {
//           super.updateState(nextState, dispatch)
//         }
//       }
//     }
//     if (process.env.NODE_ENV !== 'production') {
//       Select.prototype.componentWillUpdate = function componentWillUpdate() {
//         if (this.version === version) {
//           return
//         }
//
//         // We are hot reloading!
//         this.version = version
//       }
//     }
//     return Select
//   }
// }
