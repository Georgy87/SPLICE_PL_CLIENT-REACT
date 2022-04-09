import { Routes, Route } from 'react-router-dom';

import { AvatarEditorPage } from '../pages/AvatarEditorPage/AvatarEditorPage';
import { CreatePackPage } from '../pages/CreatePackPage/CreatePackPage';
import { LikedSamplesPage } from '../pages/LikedSamplesPage/LikedSamplesPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { PacksPage } from '../pages/PacksPage/PacksPage';
import { ProfilePackPage } from '../pages/ProfilePackPage/ProfilePackPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { SequencerPage } from '../pages/SequencerPage/SequencerPage';
import { UserPacksPage } from '../pages/UserPacksPage/UserPacksPage';
import { UserProfilePage } from '../pages/UserProfilePage/UserProfilePage';

export const AppRouter: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/registration' element={<RegistrationPage />} />
				<Route path='/' element={<PacksPage />} />
				<Route path='/profile-pack/:packId' element={<ProfilePackPage />} />
				<Route path='/profile' element={<UserProfilePage />} />
				<Route path='/profile/create' element={<CreatePackPage />} />
				<Route path='/profile/packs' element={<UserPacksPage />} />
				<Route path='/profile/avatar' element={<AvatarEditorPage />} />
				<Route path='/sequencer' element={<SequencerPage />} />
				<Route path='/likes' element={<LikedSamplesPage />} />
			</Routes>
		</>
	);
};
