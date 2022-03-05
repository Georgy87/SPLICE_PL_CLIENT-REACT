import { CircularProgress } from '@material-ui/core';

import styles from './Loader.module.scss';

type PropsType = {
	customColor?: "primary" | "secondary" | "inherit" | undefined;
}

export const Loader: React.FC<PropsType> = ({ customColor }) => {
	return (
		<div className={styles.loader}>
			<CircularProgress color={customColor} />
		</div>
	);
};
