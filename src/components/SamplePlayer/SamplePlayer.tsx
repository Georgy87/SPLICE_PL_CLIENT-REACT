import React from 'react';

import styles from './SamplePlayer.module.scss';

export const SamplePlayer = () => {
	return (
		<div className={styles.sampleWaveform}>
			<div id='waveform' className={styles.waveform} />
			<div className={styles.playerControl}></div>
		</div>
	);
};
