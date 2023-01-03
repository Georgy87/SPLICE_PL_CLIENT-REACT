import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { packsReducer } from './slices/pack/packSlice';
import { samplesReducer } from './slices/samples/samplesSlice';
import { userReducer } from './slices/user/userSlice';

// export const store = configureStore({
// 	reducer: {
// 		packs: packSlice.reducer,
// 		samples: samplesSlice.reducer,
// 		user: userSlice.reducer,
// 	},
// 	middleware: [thunk],
// });


export const rootReducer = combineReducers({
	packs: packsReducer,
	samples: samplesReducer,
	user: userReducer
});

export const store = configureStore({
	reducer: rootReducer,
	// middleware: [thunk],
});
