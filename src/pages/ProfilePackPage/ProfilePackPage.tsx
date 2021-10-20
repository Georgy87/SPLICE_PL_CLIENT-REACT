import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { SamplePlayer, waveSurfer } from '../../components/SamplePlayer/SamplePlayer';
import {
	SamplesContext,
	SamplesPlayerContextProps,
} from '../../context/Context';
import { SamplesPlayerStateType } from '../../context/SamplesPlayerContext/types';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { selectSamples } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();
	const [state, setState] = useContext(SamplesContext);

	const { samples, active, currentId } = state;

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
		waveSurfer?.load(' ');
		waveSurfer?.cancelAjax(); 
		waveSurfer?.toggleMute()
	}, []);

	return (
		<div>
			{active && samples ? <SamplePlayer /> : <div>Не активно</div>}
			<SampleList />
		</div>
	);
};
