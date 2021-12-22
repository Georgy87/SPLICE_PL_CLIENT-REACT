import React from 'react';

import './Modal.css';

export type PropsModalType = {
	active: boolean;
	setActive: (active: boolean) => void;
	video: string;
	children?: React.ReactNode;
	profileId: string;
};

export const Modal: React.FC<PropsModalType> = ({
	active,
	setActive,
	children,
}): React.ReactElement => {
	return (
		<>
			<div
				className={active ? 'modal-course active' : 'modal-course'}
				onClick={() => setActive(false)}
			>
				<div
					className={active ? 'modal-course-content active' : 'modal-course-content'}
					onClick={(e) => e.stopPropagation()}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
