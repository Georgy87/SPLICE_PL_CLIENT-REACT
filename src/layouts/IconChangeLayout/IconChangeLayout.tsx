import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { PauseCircleFilled } from '@material-ui/icons';

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
};

export const IconChangeLayout: React.FC<PropsType> = ({
	blockStyle,
	onClicked,
	iconStyle,
	iconOneOrTwo,
	iconOne,
	iconTwo,
}) => {
	let IconOne = null;
	let IconTwo = null;

	switch (iconOne) {
		case 'play':
			IconOne = <PlayCircleFilled style={iconStyle} />;
			break;
	}

	switch (iconTwo) {
		case 'pause':
			IconTwo = <PauseCircleFilled style={iconStyle} />;
			break;
	}

	return (
		<div onClick={onClicked} className={blockStyle}>
			{iconOneOrTwo ? <>{IconOne}</> : <>{IconTwo}</>}
		</div>
	);
};
