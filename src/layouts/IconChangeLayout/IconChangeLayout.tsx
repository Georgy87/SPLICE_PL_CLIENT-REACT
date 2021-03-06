import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { PauseCircleFilled } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import { Pause } from '@material-ui/icons';
import { PlayCircleOutline } from '@material-ui/icons';
import { PauseCircleOutline } from '@material-ui/icons';

import { ButtonLayout } from '../ButtonLayout/ButtonLayout';

const iconsPlay = {
	play: PlayCircleFilled,
	'play-footer': PlayArrow,
	'play-sequencer': PlayCircleOutline,
};

const iconsPause = {
	pause: PauseCircleFilled,
	'pause-footer': Pause,
	'pause-sequencer': PauseCircleOutline,
};

type PropsType = {
	blockStyle?: string;
	iconOneOrTwo: boolean;
	onClicked: any;
	iconOne: keyof typeof iconsPlay;
	iconTwo: keyof typeof iconsPause;
	iconStyle: {
		color: string;
		fontSize: string;
		cursor: string;
	};
	typeBtn:
		| 'footer'
		| 'black'
		| 'blue'
		| 'auth'
		| 'submit'
		| 'blue-disabled'
		| 'download'
		| 'sample-player'
		| 'sample-item'
		| 'sign-in-out'
		| 'update'
		| 'pack-profile'
		| 'sample-update'
		| 'tags'
		| 'sequencer'
		| 'Play sample'
		| 'pack';
	trackId?: string | number;
	currentTrackId?: string | boolean | number;
	children?: React.ReactNode;
};

export const IconChangeLayout: React.FC<PropsType> = ({
	children,
	blockStyle,
	onClicked,
	iconStyle,
	iconOneOrTwo,
	iconOne,
	iconTwo,
	typeBtn,
	trackId,
	currentTrackId,
}) => {
	const IconPlay = iconsPlay[iconOne];
	const IconPause = iconsPause[iconTwo];

	return (
		<div className={blockStyle}>
			{iconOneOrTwo && currentTrackId === trackId ? (
				<ButtonLayout typeStyle={typeBtn}>
					<IconPause style={iconStyle} onClick={onClicked} />
					{typeBtn === 'sample-player' && 'Play sample'}
					{children}
				</ButtonLayout>
			) : (
				<ButtonLayout typeStyle={typeBtn}>
					<IconPlay style={iconStyle} onClick={onClicked} />
					{typeBtn === 'sample-player' && 'Play sample'}
					{children}
				</ButtonLayout>
			)}
		</div>
	);
};
