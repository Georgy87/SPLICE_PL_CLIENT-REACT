import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './slices/playerSlice';
import { packsReducer } from './slices/packSlice';

export const rootReducer = combineReducers({
	player: playerReducer,
	packs: packsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
