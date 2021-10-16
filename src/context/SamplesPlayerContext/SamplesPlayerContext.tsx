import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSamples } from '../../store/selectors/packsSelectors';
import {
	defaultSamplesPlayerState,
	SamplesContext,
	SamplesPlayerContextProps,
} from '../Context';

type PropsType = {
	children?: React.ReactNode;
};

export const PlayerSamplesContext: React.FC<PropsType> = ({ children }) => {
	const samples = useSelector(selectSamples);

	const [state, setState] = useState<SamplesPlayerContextProps[0]>(
		defaultSamplesPlayerState,
	);
	console.log(state, samples);

	useEffect(() => {
		setState({
			ready: false,
			playList: samples,
			isPlaying: false,
			currentIndex: 0,
			active: null,
		});
	}, [samples]);

	return (
		<SamplesContext.Provider value={[state, setState]}>
			{children}
		</SamplesContext.Provider>
	);
};
