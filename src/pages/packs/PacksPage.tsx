import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGetPacks } from '../../store/slices/pack/packSlice';
import { selectPacks } from '../../store/selectors/packsSelectors';
import PacksList from '../../components/PacksList/PacksList';
import { Player } from '../../components/Player/Player';
import { SamplesContext } from '../../context/Context';

import styles from '../../styles/pagesStyles/PacksPage.module.scss';
import { waveSurfer } from '../../components/SamplePlayer/SamplePlayer';

type PropsType = {
	pageName?: string;
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const history = useHistory();
	const packs = useSelector(selectPacks);
	const dispatch = useDispatch();

	const [state, setState] = useContext(SamplesContext);
	
	const { samples, active, currentId } = state;
	// const createTrack = useAsyncAction<any, any>(fetchGetPacks);
	useEffect(() => {
		dispatch(fetchGetPacks());
	
		setState({
			ready: false,
			isPlaying: false,
			currentId: 0,
			samples: [],
			active: null,
		});
	
		waveSurfer?.stop();
		// waveSurfer?.cancelAjax() 
	}, []);

	return (
		<div className={styles.packsPageContainer}>
			<PacksList packs={packs} pageName={pageName} />
			<Player />
		</div>
	);
};
