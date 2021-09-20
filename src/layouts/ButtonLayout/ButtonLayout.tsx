import React from 'react';
import { Button } from 'antd';

import styles from './ButtonLayout.module.scss';

export const ButtonLayout: React.FC = ({ children }) => {
	return (
		<div className={styles.btnContainer}>
			<Button>{children}</Button>
		</div>
	);
};
