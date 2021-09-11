import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import MainLayout from '../../layouts/MainLayout';
// import { ITrack } from '../../types/track';
// import TrackItem from '../../components/TrackItem';
// import PacksList from '../../components/PacksList/PacksList';
// import { useActions } from '../../hooks/useAction';
// import { wrapper } from '../../store/index';

// import { Player } from '../../components/Player/Player';
// import { setPack } from '../../store/slices/packSlice';
// import { selectPacks } from '../../store/selectors/packsSelectors';
// import { packsApi } from '../../services/api/packsApi';

export const PacksPage = () => {
	const history = useHistory();
	// const packs = useSelector(selectPacks);
	
	return (
		<div>
			<MainLayout>
				<div>
					<div style={{ marginLeft: '200px'}}>
						<button>Test</button>
						<div>
							<div>
								<h1>Список треков</h1>
								<button
									onClick={() =>
										history.push('/packs/create')
									}
								>
									Загрузить
								</button>
							</div>
						</div>
						{/* <PacksList packs={packs} /> */}
						{/* <Player /> */}
					</div>
				</div>
				</MainLayout>
		</div>
	);
};

export default PacksPage;
