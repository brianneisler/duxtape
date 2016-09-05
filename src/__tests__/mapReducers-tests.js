import 'babel-polyfill'
import { expect } from 'chai'
import mapReducers from '../mapReducers'

describe('mapReducers', function() {

  it('litmus test', function() {
    const data = {}
    const mapped = {
      a: (reduction, arg1) => arg1,
      b: (reduction, arg1, arg2) => arg2
    }
    const result = mapReducers(mapped)(data, 1, 2)
    expect(result).to.deep.equal({
      a: 1,
      b: 2
    })
  })

  it('passes mapped value correctly', function() {
    const data = {
      a: {
        b: 1
      }
    }
    const mapped = {
      a: (state, arg1) => {
        expect(state).to.deep.equal({
          b: 1
        })
        return {
          b: arg1
        }
      }
    }
    const result = mapReducers(mapped)(data, 2)
    expect(result).to.deep.equal({
      a: {
        b: 2
      }
    })
  })
})
