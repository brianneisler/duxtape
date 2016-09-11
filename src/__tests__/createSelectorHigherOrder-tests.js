import 'babel-polyfill'
import { expect } from 'chai'
import { createSelectorHigherOrder } from '../'

describe('createSelectorHigherOrder', function() {

  it('returns a function', function() {
    const higerOrder = createSelectorHigherOrder([() => {}])
    expect(higerOrder).to.be.function
  })
})
