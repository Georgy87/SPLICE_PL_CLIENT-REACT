import { FC } from 'react';

import styles from './VideoPlayer.module.scss';

export const VideoPlayer: FC = () => {
	return (
		<div className={styles.player}>
			<video
				data-testid={'video-player'}
				className={styles.playerVideo}
				autoPlay
				src='https://storage.yandexcloud.net/sample-cloud/videos/Arcade%20by%20Output.mp4'
				loop
                muted
			/>
			<div className={styles.initialInformation}>
				<h1>
					More than a sample library 
				</h1>
				<p>Samples are a source of inspiration. It’s what you do with them that matters. SampleCloud allows you to
					shape millions of royalty-free samples to your sound.</p>
			</div>
		</div>
	);
};

