import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './slices/player/playerSlice';
import { packsReducer } from './slices/pack/packSlice';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
	player: playerReducer,
	packs: packsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});
