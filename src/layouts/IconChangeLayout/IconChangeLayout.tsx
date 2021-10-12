import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { PauseCircleFilled } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import { Pause } from '@material-ui/icons';
import { ButtonLayout } from '../ButtonLayout/ButtonLayout';

const iconsPlay = {
	'play': PlayCircleFilled,
	'play-footer': PlayArrow,
};

const iconsPause = {
	'pause': PauseCircleFilled,
	'pause-footer': Pause,
};

type PropsType = {
	blockStyle: string;
	iconOneOrTwo: boolean;
	onClicked: any;
	iconOne: keyof typeof iconsPlay;
	iconTwo: keyof typeof iconsPause;
	iconStyle: {
		color: string;
		fontSize: string;
		cursor: string;
	};
	typeBtn: string;
	trackId?: string;
	currentTrackId?: string;
};

export const IconChangeLayout: React.FC<PropsType> = ({
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
		<div onClick={onClicked} className={blockStyle}>
			{iconOneOrTwo && currentTrackId === trackId ? (
				<ButtonLayout typeStyle={typeBtn}>
					<IconPause style={iconStyle} />
				</ButtonLayout>
			) : (
				<ButtonLayout typeStyle={typeBtn}>
					<IconPlay style={iconStyle} />
				</ButtonLayout>
			)}
		</div>
	);
};
