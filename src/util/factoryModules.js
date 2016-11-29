import _ from 'mudash'
import combineFactories from './combineFactories'

export default function factoryModules(factories, state, modules) {
  const factory = combineFactories(factories)
  let prevModules = modules
  modules = factory(state, modules)
  while (!_.isEqual(prevModules, modules)) {
    prevModules = modules
    modules = factory(state, modules)
  }
  return modules
}
