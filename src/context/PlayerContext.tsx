import React, { useState } from 'react';
import { Context } from './Context';

export const PlayerContext = (props: any) => {
	const [state, setState] = useState({
		audioPlayer: new Audio(),
		tracks: [],
		currentTrackIndex: null,
		isPlaying: false,
	});
	return <Context.Provider value={[state, setState]}>{props.children}</Context.Provider>;
};
