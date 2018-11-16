import { createSelector } from 'reselect';

const selectClientState = state => state.get('networkClient');
const makeSelectSigner = () => createSelector(selectClientState, substate => substate.get('networkSigner'));
const makeSelectActiveNetwork = () => createSelector(selectClientState, substate => substate.get('networkSelected'));
const makeSelectNetworks = () => createSelector(selectClientState, substate => substate.get('networks'));
const makeSelectIdentity = () => createSelector(selectClientState, substate => substate.get('networkIdentity'));
const makeSelectTokens = () => createSelector(selectClientState, substate => substate.get('tokens'));
const makeSelectReader = () => createSelector(selectClientState, substate => substate.get('networkReader'));


export {
  selectClientState,
  makeSelectSigner,
  makeSelectActiveNetwork,
  makeSelectNetworks,
  makeSelectIdentity,
  makeSelectTokens,
  makeSelectReader,
}

