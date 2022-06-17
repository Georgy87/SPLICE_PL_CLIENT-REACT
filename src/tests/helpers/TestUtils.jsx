// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReducer } from '../../store/slices/user/userSlice';
import { MemoryRouter } from 'react-router-dom';
import { packsReducer } from '../../store/slices/pack/packSlice';

// Import your own reducer

// function testRender(
// 	ui,
// 	{
// 		preloadedState,
// 		store = configureStore({ reducer: function(state = '', action) {
//             switch (action.type) {
//                 case 'packs/createPackStatus/fulfilled':
//                     return action.payload;
//                 case 'packs/getPacksStatus/fulfilled':
//                     return action.payload;
//                 case 'packs/getUserPacksStatus/fulfilled':
//                     return action.payload;
//                 case 'packs/getPackStatus/fulfilled':
//                     return action.payload;
//                 case 'packs/getSearchPacksStatus/fulfilled':
//                     return action.payload;
//                 case 'packs/getSearchPacksStatus/fulfilled':
//                     return action.payload;
//                 default:
//                     return state;
//             } }, preloadedState }),
// 		...renderOptions
// 	} = {},
// ) {
// 	function Wrapper({ children }) {
// 		return (
// 			<Provider store={store}>
// 				<MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
// 			</Provider>
// 		);
// 	}
// 	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// // re-export everything
// export * from '@testing-library/react';
// // override render method
// export { testRender };
