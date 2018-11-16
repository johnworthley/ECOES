import { createSelector } from 'reselect';

const selectClientState = state => state.get('networkClient');

const makeSelectIdentity = () => createSelector(selectClientState, substate => substate.get('networkIdentity'));

export {
  makeSelectIdentity
};