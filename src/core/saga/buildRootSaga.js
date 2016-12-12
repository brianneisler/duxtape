import _ from 'mudash'
import { fork } from 'redux-saga/effects'

export default function buildRootSaga(sagas) {
  return function* rootSaga() {
    yield _.map(_.mutable(sagas), fork)
  }
}
