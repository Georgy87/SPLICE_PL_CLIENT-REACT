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

export const IconLayout: React.FC<PropsType> = ({
	blockStyle,
	onClicked,
	iconStyle,
	iconOneOrTwo,
	iconOne,
	iconTwo,
}) => {
	let IconOne = null;
	let IconTwo = null;

	if (iconOne === 'play' && iconTwo === 'pause') {
		IconOne = <PlayCircleFilled style={iconStyle} />;
		IconTwo = <PauseCircleFilled style={iconStyle} />;
	}

	return (
		<div onClick={onClicked} className={blockStyle}>
			{iconOneOrTwo ? <>{IconOne}</> : <>{IconTwo}</>}
		</div>
	);
};
