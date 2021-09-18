import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerSliceState } from '../types/player';
import { RootState } from '../types';
import { Pack } from '../types/packs';

const initialState: PlayerSliceState = {
	currentTime: 0,
	duration: 0,
	active: null,
	volume: 50,
	pause: false,
	audio: null,
	test: '',
};

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		playTrack: (state) => {
			state.pause = false;
		},
		pauseTrack: (state) => {
			state.pause = true;
		},
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload;
		},
		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload;
		},
		setCurrentTime: (state, action: PayloadAction<number>) => {
			state.currentTime = action.payload;
		},
		setActiveTrack: (
			state,
			action: PayloadAction<{ pack: Pack; flag: boolean }>,
		) => {
			state.active = action.payload.pack;
            // if (action.payload.flag === false) {
            //     state.currentTime = 0;
            //     state.duration = 0;
            // }
		},
		setAudio: (state, action) => {
			state.audio = action.payload;
		},
		setAudioSrc: (state, action) => {
			state.audio.src = action.payload;
		},
		setAudioPlay: (state) => {
			
			state.audio.play();
		},
		setAudioPause: (state) => {
			state.audio.pause();
		},
	},
	// extraReducers: (builder) => {
	//     builder.addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
	//         // state = state;
	//     })
	// }
});

const ActionCreators = playerSlice.actions;

export { ActionCreators };
export const playerReducer = playerSlice.reducer;
