import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGetPacks } from '../../store/slices/pack/packSlice';
import { selectPacks } from '../../store/selectors/packsSelectors';
import PacksList from '../../components/PacksList/PacksList';
import { Player } from '../../components/Player/Player';

import styles from '../../styles/pagesStyles/PacksPage.module.scss';

type PropsType = {
	pageName?: string;
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const history = useHistory();
	const packs = useSelector(selectPacks);
	const dispatch = useDispatch();
	// const createTrack = useAsyncAction<any, any>(fetchGetPacks);
	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	return (
		<div className={styles.packsPageContainer}>
			<PacksList packs={packs} pageName={pageName} />
			<Player />
		</div>
	);
};
