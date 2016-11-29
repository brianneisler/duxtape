import { expect } from 'chai'
import EnhancerModule from '../EnhancerModule'

describe('EnhncerModule', function() {
  it('creates a module with expected name, state and composeEnhancer method', function() {
    const testState = {
      a: 1
    }
    const testModules = []
    const testStore = {}
    const module = EnhancerModule(testState, testModules, testStore)
    expect(module.state).to.deep.equal({
      enhancers: []
    })
    expect(module.name).to.equal('enhancer')
    expect(module.composeEnhancer).to.be.a('function')
  })
})
