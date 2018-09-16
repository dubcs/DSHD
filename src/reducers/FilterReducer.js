import {
  FILTER_UPDATE
} from '../actions/types';

const INTITIAL_STATE = {
  distance: ''
};

export default (state = INTITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
