import { select, spawn } from 'redux-saga/effects';
import { makeSelectSigner, makeSelectActiveNetwork } from './selectors';
import { buildReader, buildWriter } from './builders';


export function* buildDispatcher() {
  const signer = yield select(makeSelectSigner());
  const network = yield select(makeSelectActiveNetwork());
  // build only dispatches if we do have networks and signer
  if (signer && network) {
    yield spawn(buildReader, network);
    yield spawn(buildWriter, signer, network);
  }
}