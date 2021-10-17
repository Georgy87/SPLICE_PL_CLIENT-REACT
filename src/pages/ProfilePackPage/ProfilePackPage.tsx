import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { selectSamples } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
	}, []);

	return (
		<div>
			<SampleList />
		</div>
	);
};
