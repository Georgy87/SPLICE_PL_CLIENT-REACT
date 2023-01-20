import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { SampleList } from '../../components/SampleList/SampleList';
import { defaultState } from '../../context/PlayerContextProvider';
import { useSound } from '../../hooks/useSound';
import { selectLikedSamples, selectUserMain } from '../../store/selectors/userSelectors';
import { fetchGetLikedSamples } from '../../store/slices/user/actions';
import { useAppDispatch } from '../../store/types';

import styles from './LikedSamplesPage.module.scss';

const LikedSamplesPage: React.FC = () => {
    const likedSamples = useSelector(selectLikedSamples);
    const user = useSelector(selectUserMain);

    const { setPlayerState } = useSound();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGetLikedSamples());
    }, []);

    useEffect(() => {
        setPlayerState({
            ...defaultState,
            samples: likedSamples,
            packs: null,
        });
    }, [user]);

    return (
        <div className={styles.root} data-testid="liked-samples-page">
            {<SampleList samples={likedSamples} pageName="liked-samples-page" />}
        </div>
    );
};

export default LikedSamplesPage;
