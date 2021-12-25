import React, { useState } from 'react';

import { Modal } from '../../layouts/ModalLayout/ModalLayout';
import { sampleCategories } from './sampleCategories';

import styles from './AddSampleInfoModal.module.scss';

export type AddSampleInfoModalType = {
	active: boolean;
	setActive: (active: boolean) => void;
};

export const AddSampleInfoModal: React.FC<AddSampleInfoModalType> = (props: any) => {
	const [value, setValue] = useState<number>(0);
	const [bpmValue, setBpmValue] = useState<number>(0);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>('Choose One');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(+e.target.value);
		setBpmValue(+e.target.value);
	};

	return (
		<Modal {...props}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<p>SAMPLE BPM</p>
				<div className={styles.modalContent}>
					<div className={styles.addBpm}>
						<div className={styles.rangeValue} style={{ left: `${value / 3}%` }}>
							{bpmValue}
						</div>

						<input
							type='range'
							onChange={onChange}
							defaultValue={value}
							min='0'
							max='300'
						/>
					</div>

					<div className={styles.sampleCategory}>
						<p>Sample category</p>

						<div className={styles.dropdown}>
							<div
								className={styles.dropdownBtn}
								onClick={(e) => setIsActive(!isActive)}
							>
								{selected}
								<span className='fas fa-caret-down'></span>
							</div>
							{isActive && (
								<div className={styles.dropdownContent}>
									{sampleCategories.map((option) => (
										<div
											onClick={(e) => {
												setSelected(option);
												setIsActive(false);
											}}
											className={styles.dropdownItem}
										>
											{option}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default Modal;
