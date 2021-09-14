import { createStore } from 'redux';

import { RootState } from './types';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
// import { playerReducer } from './slices/playerSlice';
import { packsReducer } from './slices/packSlice';

export const rootReducer = combineReducers({
    // player: playerReducer,
    packs: packsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

// export const store = createStore(
//     rootReducer,
// );

