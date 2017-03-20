import { default as createStore } from './createStore'
import * as modules from './modules'
import * as core from './core'

const exports = {
  ...core,
  createStore,
  modules
}

exports.default = exports
module.exports = exports
