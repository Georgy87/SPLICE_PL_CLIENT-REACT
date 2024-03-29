import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

import { initialState as initialPackState } from '../store/slices/pack/packSlice';
import { initialState as initialUserState } from '../store/slices/user/userSlice';
import { initialState as initialSamplesState } from '../store/slices/samples/samplesSlice';
import { store } from '../store';
import { AppRouter } from '../router/AppRouter';
import { AppDispatch, RootState } from '../store/types';

export const mockStore = createMockStore([thunk]);

export const MOCK_INITIAL_STATE = {
  packs: initialPackState,
  user: initialUserState,
  samples: initialSamplesState,
};

export const renderWithStore = (
  component: ReactNode,
  initialState: Partial<typeof MOCK_INITIAL_STATE> = {},
  param?: string,
) => {
  const store = mockStore({ ...MOCK_INITIAL_STATE, ...initialState });
  return {
    result: render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[param ? param : '/']}>{component}</MemoryRouter>
      </Provider>,
    ),
    store,
  };
};

export const renderWithRouter = (component: React.ReactChild, initialRoute = '/login') => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </Provider>
  );
};

type DispatchExts = AppDispatch;

export const createStoreMock = (): MockStoreCreator<RootState, DispatchExts> => {
  const middlewares = [thunkMiddleware];
  return createMockStore<RootState, DispatchExts>(middlewares);
};
