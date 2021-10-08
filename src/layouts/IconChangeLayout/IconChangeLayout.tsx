import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { PauseCircleFilled } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import { Pause } from '@material-ui/icons';
import { ButtonLayout } from '../ButtonLayout/ButtonLayout';

type PropsType = {
	blockStyle: string;
	iconOneOrTwo: boolean;
	onClicked: any;
	iconOne: string;
	iconTwo: string;
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
	let IconOne = null;
	let IconTwo = null;

	switch (iconOne) {
		case 'play' :
			IconOne = <PlayCircleFilled style={iconStyle} />;
			break;
		case 'play-footer':
			IconOne = <PlayArrow style={iconStyle} />;
			break;
	}

	switch (iconTwo) {
		case 'pause':
			IconTwo = <PauseCircleFilled style={iconStyle} />;
			break;
		case 'pause-footer':
			IconTwo = <Pause style={iconStyle} />;
			break;
	}

	return (
		<div onClick={onClicked} className={blockStyle}>
			{iconOneOrTwo && currentTrackId === trackId ? (
				<ButtonLayout typeStyle={typeBtn}>{IconTwo}</ButtonLayout>
			) : (
				<ButtonLayout typeStyle={typeBtn}>{IconOne}</ButtonLayout>
			)}
		</div>
	);
};
