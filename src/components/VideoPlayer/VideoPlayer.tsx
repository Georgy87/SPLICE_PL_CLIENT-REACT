import React from 'react';

import styles from './VideoPlayer.module.scss';

import './VideoPlayer.module.scss';

export const VideoPlayer: React.FC = () => {
	return (
		<div className={styles.player}>
			<video
				className={styles.playerVideo}
				autoPlay
				src='https://storage.yandexcloud.net/sample-cloud/videos/ARCADE%20by%20Output.mp4'
				loop
                muted
			/>
			<div className={styles.initialInformation}>
				<h1>
					More than a sample library 
				</h1>
				<p>Samples are a source of inspiration. It’s what you do with them that matters. Loopcloud allows you to
					shape millions of royalty-free samples to your sound.</p>
			</div>
		</div>
	);
};
