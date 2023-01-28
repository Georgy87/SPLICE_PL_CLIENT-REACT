import { FC } from 'react';
import classNames from 'classnames';

import styles from './Steps.module.scss';

type PropsType = {
  step: string;
  typeStyle: string;
};

export const Steps: FC<PropsType> = (props) => {
  const { step, typeStyle } = props;
  return (
    <div className={styles.step}>
      <div
        className={classNames(`${styles.step}`, {
          [styles.stepRed]: typeStyle === 'step-red',
          [styles.stepBlue]: typeStyle === 'step-blue',
        })}
      >
        {step}
        <div className={styles.line}></div>
      </div>
    </div>
  );
};
