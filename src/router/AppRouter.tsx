import { Route, Switch } from 'react-router';

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
			<Switch>
				<Route path='/login' component={LoginPage} exact />
				<Route path='/registration' component={RegistrationPage} exact />
				<Route path={'/'} component={() => <PacksPage pageName={'main-packs'} />} exact />
				<Route path='/profile-pack/:packId?' component={ProfilePackPage} exact />
				<Route path='/profile' component={UserProfilePage} exact />
				<Route path='/profile/create' component={CreatePackPage} exact />
				<Route path='/profile/packs' component={UserPacksPage} exact />
				<Route path='/profile/avatar' component={AvatarEditorPage} exact />
				<Route path='/sequencer' component={SequencerPage} exact />
				<Route path='/likes' component={LikedSamplesPage} exact />
			</Switch>
		</>
	);
};
