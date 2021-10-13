import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { packsReducer } from './slices/pack/packSlice';
import { samplesReducer } from './slices/samples/samplesSlice';

export const rootReducer = combineReducers({
	packs: packsReducer,
	samples: samplesReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});
