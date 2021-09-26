import React from 'react';
import styles from './Steps.module.scss';

type PropsType = {
    step: string;
    color: string;
}

export const Steps: React.FC<PropsType> = (props) => {
    const { step, color} = props;
    return (
        <div className={styles.stepContainer}>
			<p style={{ color: `${color}` }}>{step}</p>
        </div>
    )
}