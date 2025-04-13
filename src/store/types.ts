export enum ActionType {
  SET_LOADING = 'SET_LOADING',
}

export interface StoreState {
  showLoader?: boolean;
  loaderMessage?: string | React.ReactNode;
  loaderTitle?: string | React.ReactNode;
}

export interface DispatchObject {
  type: ActionType;
  payload: StoreState;
}

export type DispatchValue =
  | DispatchObject
  | ((dispatch: React.Dispatch<DispatchObject>, store: StoreState) => void | Promise<void>);
