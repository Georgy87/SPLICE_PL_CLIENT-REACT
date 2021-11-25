import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { PacksPage } from '../PacksPage/PacksPage';

export const UserPacksPage = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(fetchGetUserPacks());
	}, []);
	return (
		<>
			<PacksPage pageName={'user-packs'} />
		</>
	);
};
