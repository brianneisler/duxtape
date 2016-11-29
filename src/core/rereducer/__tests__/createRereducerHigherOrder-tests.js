import 'babel-polyfill'
import { expect } from 'chai'
import { createRereducerHigherOrder } from '../'

describe('createRereducerHigherOrder', function() {

  it('returns a function', function() {
    const higerOrder = createRereducerHigherOrder([() => {}])
    expect(higerOrder).to.be.function
  })
})
