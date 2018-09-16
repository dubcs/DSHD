import {
  FILTER_UPDATE
} from './types';

export const filterUpdate = ({ prop, value }) => {
  return {
    type: FILTER_UPDATE,
    payload: { prop, value }
  };
};
