import React, { MouseEvent, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useAction';

import { Pack } from '../../store/types/packs';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type PackListProps = {
	pack: Pack;
	active?: boolean;
}

export const PackItem: React.FC<PackListProps> = ({ pack }) => {
	
	const router = useHistory();

	const { playTrack, pauseTrack, setActiveTrack, setAudioPlay, setAudioPause, setAudio, setAudioSrc, setDuration, setCurrentTime } = useActions();

	const { pause, active, volume } = useTypedSelector(
		(state) => state.player,
	);
	
	const play = (e: any) => {
		e.stopPropagation();
    
		if (pause) {
			setActiveTrack(pack);
			setAudioSrc('http://localhost:5000/' + active?.audio);
			setAudioPlay();
			playTrack();
		} else {
			pauseTrack();
			setAudioPause();
		}
	};

	return (
		<div>
			<button onClick={play}>
				{pause ? <button>Play</button> : <button>Pause</button>}
			</button>
			<img width={70} height={70} src={`http://localhost:5000/${pack.picture}`} />

			<div>
				<div>{pack.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>
					{pack.artist}
				</div>
			</div>

			{active && <div>02:42 / 03:22</div>}
			<button>Удалить</button>
		</div>
	);
};
