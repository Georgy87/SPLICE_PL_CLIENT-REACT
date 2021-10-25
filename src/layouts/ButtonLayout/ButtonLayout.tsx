import React from 'react';

import classNames from 'classnames';

import styles from './ButtonLayout.module.scss';
import { IconLayout } from '../IconLayout/IconLayout';

type PropsType = {
	typeStyle: string;
	onClicked?: () => void;
	disabled?: boolean;
};

export const ButtonLayout: React.FC<PropsType> = ({ children, typeStyle, onClicked, disabled }) => {
	return (
		<div className={styles.platformBtn}>
			<button disabled={disabled} onClick={onClicked}
				className={classNames(`${styles.platformBtn}`, {
					[styles.footer]: typeStyle === 'footer',
					[styles.black]: typeStyle === 'black',
					[styles.blue]: typeStyle === 'blue',
					[styles.blueDisabled]: typeStyle === 'blue-disabled',
					[styles.download]: typeStyle === 'download',
					[styles.samplePlayer]: typeStyle === 'sample-player',
					[styles.sampleItem]: typeStyle === 'sample-item',
				})}
			>
				{children}
			</button>
		</div>
	);
};
