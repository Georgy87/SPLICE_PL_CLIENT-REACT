import React from 'react';

import classNames from 'classnames';
import { IconLayout } from '../IconLayout/IconLayout';

import styles from './ButtonLayout.module.scss';

type PropsType = {
	typeStyle:
		| 'auth'
		| 'submit'
		| 'footer'
		| 'black'
		| 'blue'
		| 'blue-disabled'
		| 'download'
		| 'sample-player'
		| 'sample-item'
		| 'auth'
		| 'sign-in-out'
		| 'sign-in-out-sidebar'
		| 'update'
		| 'pack-profile'
		| 'sample-update'
		| 'tags'
		| 'sequencer'
		| 'sample-player'
		| 'Play sample'
		| 'pack'
		| 'update-avatar'
		| 'update-bpm';

	onClicked?: () => void;
	disabled?: boolean;
	type?: string;
	className?: string;
	onClick?: () => void;
};

export const ButtonLayout: React.FC<PropsType> = ({ children, typeStyle, onClicked, disabled }) => {
	return (
		<div className={styles.platformBtn}>
			<button
				disabled={disabled}
				onClick={onClicked}
				type={typeStyle === 'auth' ? 'submit' : undefined}
				className={classNames(`${styles.platformBtn}`, {
					[styles.footer]: typeStyle === 'footer',
					[styles.black]: typeStyle === 'black',
					[styles.blue]: typeStyle === 'blue',
					[styles.blueDisabled]: typeStyle === 'blue-disabled',
					[styles.download]: typeStyle === 'download',
					[styles.samplePlayer]: typeStyle === 'sample-player',
					[styles.sampleItem]: typeStyle === 'sample-item',
					[styles.auth]: typeStyle === 'auth',
					[styles.signInOut]: typeStyle === 'sign-in-out',
					[styles.signInOutSidebar]: typeStyle === 'sign-in-out-sidebar',
					[styles.update]: typeStyle === 'update',
					[styles.packProfile]: typeStyle === 'pack-profile',
					[styles.sampleUpdate]: typeStyle === 'sample-update',
					[styles.tags]: typeStyle === 'tags',
					[styles.sequencer]: typeStyle === 'sequencer',
					[styles.updateAvatar]: typeStyle === 'update-avatar',
					[styles.updateBpm]: typeStyle === 'update-bpm',
				})}
			>
				{children}
			</button>
		</div>
	);
};
