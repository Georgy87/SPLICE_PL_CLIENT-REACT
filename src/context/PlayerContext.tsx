import React, { useState, useEffect, ReactChildren, ContextType } from 'react';
import { useSelector } from 'react-redux';

import { selectPacks } from '../store/selectors/packsSelectors';
import { Pack } from '../store/types/packs';
import { Context, ContextProps } from './Context';
import { PlayerStateType } from './types';

type PropsType = {
	children: React.ReactNode;
}

export const PlayerContext: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);

	const [state, setState] = useState<any>({});

	useEffect(() => {
		if (packs) {
			setState({
				audioPlayer: new Audio(),
				packs: packs,
				currentTrackIndex: null,
				isPlaying: false,
				currentTrackId: null,
				active: null,
				duration: 0,
				currentTime: 0,
				volume: 50,
			});
		}
	}, [packs]);

	return (
		<Context.Provider value={[state, setState]}>
			{children}
		</Context.Provider>
	);
};
