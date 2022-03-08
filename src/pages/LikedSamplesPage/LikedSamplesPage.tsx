import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/Loader/Loader';
import { SampleList } from '../../components/SampleList/SampleList';
import { defaultState } from '../../context/PlayerContextProvider/PlayerContextProvider';
import { useSound } from '../../hooks/useSound';
import { selectLikedSamples, selectUserMain } from '../../store/selectors/userSelectors';
import { fetchGetLikedSamples } from '../../store/slices/user/actions';

import styles from './LikedSamplesPage.module.scss';

export const LikedSamplesPage: React.FC = () => {
	const likedSamples = useSelector(selectLikedSamples);
	const user = useSelector(selectUserMain);

    const { setPlayerState } = useSound();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetLikedSamples());
	}, []);

	useEffect(() => {
        setPlayerState({
			...defaultState,
			samples: likedSamples,
			packs: null,
		});
		console.log(likedSamples);
	}, [user]);

	return <div className={styles.root}>{!likedSamples ? <Loader /> : <SampleList samples={likedSamples} pageName="liked-samples-page" />}</div>;
};
