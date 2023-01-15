import { useEffect } from 'react';

import { Navbar } from '@components/Navbar';
import { PlayerContextProvider } from '@context/PlayerContextProvider';
import { fetchAuth } from '@slices/user/actions';
import { AppRouter } from '@router/AppRouter';
import { useAppDispatch } from '@store/types';

import styles from './App.module.scss';

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuth());
    }, []);

    return (
        <PlayerContextProvider>
            <div className={styles.appContainer}>
                <div className={styles.navbarBlock}>
                    <Navbar />
                </div>
                <div className={styles.pagesBlock}>
                    <AppRouter />
                </div>
            </div>
        </PlayerContextProvider>
    );
};
