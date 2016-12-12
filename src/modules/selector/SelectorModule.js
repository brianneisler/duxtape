import _ from 'mudash'
import o from 'duxtape'
import { Driver } from '@moltres/drivers/driver'

export default class SelectorsDriver extends Driver {

  createMiddleware(state) {
    return o.createSelectorMiddleware(_.get(state, 'selectorEngine'))
  }

  createState(state) {
    return _.assoc(state, {
      selectorEngine: o.createSelectorEngine()
    })
  }
}
