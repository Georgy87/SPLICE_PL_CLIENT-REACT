import React from 'react';

import styles from './Modal.module.scss';

export type PropsModalType = {
	active: boolean;
	setActive: (active: boolean) => void;
	children?: React.ReactNode;
};

export const Modal: React.FC<PropsModalType> = ({ active, setActive, children }) => {
	return (
		<div
			data-testid="modal"
			className={active ? `${styles.modalCourse} ${styles.active}` : `${styles.modalCourse}`}
			onClick={() => setActive(false)}
		>
			{children}
		</div>
	);
};

export default Modal;
