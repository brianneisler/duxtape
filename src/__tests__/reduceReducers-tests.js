import 'babel-polyfill'
import _ from 'mudash'
import { expect } from 'chai'
import reduceReducers from '../reduceReducers'

describe('reduceReducers', function() {

  it('litmus test', function() {
    const data = {}
    const reducers = [
      (reduction, arg1) => _.set(reduction, 'a', arg1),
      (reduction, arg1, arg2) => _.set(reduction, 'b', arg2)
    ]
    const result = reduceReducers(...reducers)(data, 1, 2)
    expect(result).to.deep.equal({
      a: 1,
      b: 2
    })
  })
})
