import { ReactNode, memo, FC } from 'react';

import { Play } from '@components/Kit/Icons/Play';
import { Pause } from '@components/Kit/Icons/Pause';

import styles from './IconChangeLayout.module.scss';

type PropsType = {
    blockStyle?: string;
    iconOneOrTwo: boolean;
    onClicked: any;
    trackId?: string | number;
    currentTrackId?: string | boolean | number;
    children?: ReactNode;
    size: string;
    color: string;
};

export const IconChangeLayoutToMemo: FC<PropsType> = ({
    children,
    blockStyle,
    onClicked,
    iconOneOrTwo,
    trackId,
    currentTrackId,
    size,
    color,
}) => {
    const IconPlay = Play;
    const IconPause = Pause;

    return (
        <div className={blockStyle}>
            {iconOneOrTwo && currentTrackId === trackId ? (
                <button onClick={onClicked} className={styles.iconBtn}>
                    <IconPause size={size} color={color} />
                    {children}
                </button>
            ) : (
                <button onClick={onClicked} className={styles.iconBtn}>
                    <IconPlay size={size} color={color} />
                    {children}
                </button>
            )}
        </div>
    );
};

export const IconChangeLayout = memo(IconChangeLayoutToMemo);
