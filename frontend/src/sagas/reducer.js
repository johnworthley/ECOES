import { fromJS } from 'immutable';
import {
  WRITER_DISABLED,
  } from './constants';

  const initialState = fromJS({
    writerLoading: false,
    networkWriter: null,
    networkIdentity: null,
    networkAccount: null,
  });

  function clientReducer(state = initialState, action) {
    switch (action.type) {
      case WRITER_DISABLED:
        return state
            .set('networkWriter', null)
            .set('networkAccount', null)
            .set('networkIdentity', null)
            .set('writerLoading', false);
                default:
      return state;
  }
}

export default clientReducer;
