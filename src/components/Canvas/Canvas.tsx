import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectSamples } from '../../store/selectors/packsSelectors';
import { fetchGetPacks } from '../../store/slices/pack/packSlice';
import { CanvasItems } from '../CanvasItems/CanvasItems';

export const Canvas = () => {
	const samples = useSelector(selectSamples);

	return (
		<>
			{samples?.map((sample) => (
                <div style={{width: '500px'}}>
				<CanvasItems key={sample._id} samplesUrl={sample.audio} />
                </div>
			))}
		</>
	);
};
