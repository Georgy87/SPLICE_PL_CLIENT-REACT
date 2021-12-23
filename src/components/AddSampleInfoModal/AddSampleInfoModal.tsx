import React, { useState } from 'react';

import { Modal } from '../../layouts/ModalLayout/ModalLayout';

import styles from './AddSampleInfoModal.module.scss';

export type AddSampleInfoModalType = {
	active: boolean;
	setActive: (active: boolean) => void;
};

export const AddSampleInfoModal: React.FC<AddSampleInfoModalType> = (props: any) => {
	const [value, setValue] = useState<number>(0);

	return (
		<Modal {...props}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalContent}>
					<div className={styles.rangeValue}></div>
					<div className={styles.addBpm}>
						<input type='range' />
						<p>BPM</p>
					</div>

					{/* <div className={styles.sampleCategory}>
						<select></select>
						<p>Sample category</p>
					</div> */}
				</div>
			</div>
		</Modal>
	);
};

export default Modal;
