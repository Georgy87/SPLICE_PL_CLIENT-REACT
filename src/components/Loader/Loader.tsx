import { CircularProgress } from '@material-ui/core';

import styles from './Loader.module.scss';

export const Loader = () => {
	return (
		<div className={styles.loader}>
			<CircularProgress color='inherit' />
		</div>
	);
};
