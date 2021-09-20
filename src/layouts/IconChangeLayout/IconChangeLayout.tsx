import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { PauseCircleFilled } from '@material-ui/icons';
import { PlayArrow } from '@material-ui/icons';
import { Pause } from '@material-ui/icons';
import { ButtonLayout } from '../ButtonLayout/ButtonLayout';

type PropsType = {
	blockStyle: string;
	iconOneOrTwo: boolean;
	onClicked: () => void;
	iconOne: string;
	iconTwo: string;
	iconStyle: {
		color: string;
		fontSize: string;
		cursor: string;
	};
	typeBtn: string;
};

export const IconChangeLayout: React.FC<PropsType> = ({
	blockStyle,
	onClicked,
	iconStyle,
	iconOneOrTwo,
	iconOne,
	iconTwo,
	typeBtn,
}) => {
	let IconOne = null;
	let IconTwo = null;

	switch (iconOne) {
		case 'play':
			IconOne = <PlayCircleFilled style={iconStyle} />;
			break;
		case 'play-footer':
			IconOne = <PlayArrow />;
			break;
	}

	switch (iconTwo) {
		case 'pause':
			IconTwo = <PauseCircleFilled style={iconStyle} />;
			break;
		case 'pause-footer':
			IconTwo = <Pause />;
			break;
	}

	return (
		<div onClick={onClicked} className={blockStyle}>
			{iconOneOrTwo ? (
				<ButtonLayout>{IconOne}</ButtonLayout>
			) : (
				<ButtonLayout>{IconTwo}</ButtonLayout>
			)}
		</div>
	);
};
