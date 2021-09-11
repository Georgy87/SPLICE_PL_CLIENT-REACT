import { RootState } from './types';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
// import { playerReducer } from './slices/playerSlice';
import { packsReducer } from './slices/packSlice';

export const rootReducer = combineReducers({
    player: playerReducer,
    packs: packsReducer,
});

export const makeStore = (): Store<RootState> => configureStore({
    reducer: rootReducer,
});
