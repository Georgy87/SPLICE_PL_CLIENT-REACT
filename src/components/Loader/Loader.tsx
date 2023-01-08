import styles from './Loader.module.scss';

type PropsType = {
    customColor?: 'primary' | 'secondary' | 'inherit' | undefined;
};

export const Loader: React.FC<PropsType> = ({ customColor }) => {
    return (
        <div className={styles.loader} data-testid="loader">
            ...Loading
        </div>
    );
};
