import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useAsyncAction } from '../../hooks/useAsyncAction';
import { fetchGetPacks } from '../../store/slices/packSlice';
import { selectPacks } from '../../store/selectors/packsSelectors';
// import { ITrack } from '../../types/track';
// import TrackItem from '../../components/TrackItem';
// import { useActions } from '../../hooks/useAction';
// import { setPack } from '../../store/slices/packSlice';
// import { selectPacks } from '../../store/selectors/packsSelectors';
// import { packsApi } from '../../services/api/packsApi';
import PacksList from '../../components/PacksList/PacksList';
import { Player } from '../../components/Player/Player';

export const PacksPage = () => {
	const history = useHistory();
	const packs = useSelector(selectPacks);
	const dispatch = useDispatch();
	// const createTrack = useAsyncAction<any, any>(fetchGetPacks);
	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	return (
		<div style={{ marginLeft: '200px' }}>
			<div>
				<div>
					<h1>Список треков</h1>
					<button onClick={() => history.push('/packs/create')}>
						Загрузить
					</button>
				</div>
			</div>
			<PacksList packs={packs} />
			<Player />
		</div>
	);
};

export default PacksPage;
