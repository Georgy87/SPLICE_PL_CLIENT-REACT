import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { SamplePlayer, waveSurfer } from '../../components/SamplePlayer/SamplePlayer';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useSampleSound } from '../../hooks/useSampleSound';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();
	const { active, currentId, samples, playSample, loading, setState } = useSampleSound();

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
		// waveSurfer?.load(' ');
		// waveSurfer?.cancelAjax(); 
		waveSurfer?.toggleMute();
	}, []);

	return (
		<div>
			{active && samples ? <SamplePlayer /> : <div>Не активно</div>}
			<SampleList />
		</div>
	);
};
