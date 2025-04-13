import { StoreState, DispatchObject, ActionType } from './types';

export const mainReducer = (state: StoreState, action: DispatchObject): StoreState => {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getState = (payload: StoreState): DispatchObject => ({
  type: ActionType.SET_LOADING,
  payload,
});
