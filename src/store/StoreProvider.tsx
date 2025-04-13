import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  PropsWithChildren,
} from 'react';
import { Loader } from '@/components/ui/Cover';
import { mainReducer } from './reducer';
import { StoreState, DispatchValue } from './types';

const StoreContext = createContext<{
  store: StoreState;
  dispatch: React.Dispatch<DispatchValue>;
}>({
  store: {
    showLoader: false,
    loaderMessage: '',
    loaderTitle: '',
  },
  dispatch: () => {
    throw new Error('dispatch must be used inside StoreProvider');
  },
});

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useReducer(mainReducer, {
    showLoader: false,
    loaderMessage: '',
    loaderTitle: '',
  });

  const dispatch = useMemo(() => {
    return (args: DispatchValue) => {
      if (typeof args === 'object') setStore(args);
      else if (typeof args === 'function') args(setStore, store);
    };
  }, [setStore, store]);

  return (
    <>
      <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>
      <Loader
        visible={store.showLoader}
        title={store.loaderTitle}
        message={store.loaderMessage}
      />
    </>
  );
};

export const useStoreProvider = () => useContext(StoreContext);
