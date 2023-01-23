import React, { memo, useState } from 'react';

import { useAppDispatch } from '@store/types';
import { Modal } from '@layouts/ModalLayout';
import { sampleCategories } from './sampleCategories';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { fetchSetSampleBpm, fetchSetSampleCategory } from '@slices/samples/actions';

import styles from './AddSampleInfoModal.module.scss';

export type AddSampleInfoModalType = {
    active: boolean;
    setActive: (active: boolean) => void;
    sampleId: string;
};

const AddSampleInfoModalToMemo: React.FC<AddSampleInfoModalType> = (props) => {
    const { sampleId } = props;

    const [value, setValue] = useState<number>(0);
    const [bpmValue, setBpmValue] = useState<number>(0);
    const [category, setCategory] = useState<string>(sampleCategories[0]);
    const [isActive, setIsActive] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(+e.target.value);
        setBpmValue(+e.target.value);
    };

    const dropDownContent = () =>
        isActive && (
            <div className={styles.dropdownContent}>
                {sampleCategories.map((option) => (
                    <div
                        onClick={(e) => {
                            setCategory(option);
                            setIsActive(false);
                        }}
                        className={styles.dropdownItem}
                    >
                        {option}
                    </div>
                ))}
            </div>
        );
    return (
        <Modal {...props}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p>SAMPLE BPM</p>
                <div className={styles.modalContent}>
                    <div className={styles.addBpm}>
                        <div className={styles.rangeValue} style={{ left: `${value / 3}%` }}>
                            {bpmValue}
                        </div>

                        <input type="range" onChange={onChange} defaultValue={value} min="0" max="300" />
                    </div>
                    <ButtonLayout
                        typeStyle="sample-update"
                        onClicked={() => dispatch(fetchSetSampleBpm({ sampleId, bpm: bpmValue }))}
                    >
                        Update bpm
                    </ButtonLayout>
                    <div className={styles.sampleCategory}>
                        <p>Sample category</p>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownBtn} onClick={(e) => setIsActive(!isActive)}>
                                {dropDownContent()}
                                {category}
                                <span className="fas fa-caret-down"></span>
                            </div>
                        </div>
                        <ButtonLayout
                            typeStyle="sample-update"
                            onClicked={() => dispatch(fetchSetSampleCategory({ sampleId, category }))}
                        >
                            Update Category
                        </ButtonLayout>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export const AddSampleInfoModal = memo(AddSampleInfoModalToMemo);
