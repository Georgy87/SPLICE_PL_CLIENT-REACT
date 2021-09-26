import React from 'react';
import { useHistory } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
	const history = useHistory();

	return (
		<div>
			<button
				style={{ color: 'green', height: '100px', marginTop: '300px' }}
				onClick={() => history.push('/profile/create')}
			>
				DOWNLOAD PACK
			</button>
		</div>
	);
};
