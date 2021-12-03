import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSamples } from '../../store/selectors/packsSelectors';
import { fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { PacksPage } from '../PacksPage/PacksPage';

export const UserPacksPage = () => {
	const samples = useSelector(selectSamples);

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
