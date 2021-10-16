import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import {
	selectPacks,
	selectSamples,
} from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';
import { WaveSurferPlayer } from '../WaveSurfer/WaveSurferPlayer';

export const ProfilePackPage = () => {
	const samples = useSelector(selectSamples);
	
	const params: { packId: string } = useParams();

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
	}, []);

	return (
		<div>
			{samples?.map((sample) => {
				return (
					<>
						{
							<WaveSurferPlayer
								url={
									`http://localhost:5000/${sample?.audio}`
								}
							/>
						}
					</>
				);
			})}
		</div>
	);
};
