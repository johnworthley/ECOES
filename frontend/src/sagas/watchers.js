import { takeLatest, all } from 'redux-saga/effects';

import {
  WRITER_DISABLED,
  SET_IDENTITY,
  LOADED_NETWORKS,
  SET_NETWORK,
  SET_SIGNER,
} from './constants';

import { buildDispatcher } from './dispatcher';
import { destroyIdentity } from './destroyers';


// load accounts is triggered by the account dispatcher
export function* forgetIdentity() {
  yield takeLatest(WRITER_DISABLED, destroyIdentity);
}

// client (re)build can be triggered by signer set, networks loaded, or user request
export function* watchForClientBuild() {
  yield takeLatest([SET_SIGNER, LOADED_NETWORKS, SET_NETWORK, SET_IDENTITY], buildDispatcher);
}

export default function* rootSaga() {
  yield  all([
    forgetIdentity(),
    watchForClientBuild(),
  ]);
}