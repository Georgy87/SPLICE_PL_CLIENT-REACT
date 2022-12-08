import { Routes, Route } from 'react-router-dom';

import { QUERY_PARAM } from '../constans/routing';

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
                <Route path={QUERY_PARAM.LOGIN} element={<LoginPage />} />
                <Route path={QUERY_PARAM.REGISTRATION} element={<RegistrationPage />} />
                <Route path={QUERY_PARAM.MAIN} element={<PacksPage />} />
                <Route path={QUERY_PARAM.PROFILE_PACK} element={<ProfilePackPage />} />
                <Route path={QUERY_PARAM.PROFILE} element={<UserProfilePage />} />
                <Route path={QUERY_PARAM.PROFILE_CREATE} element={<CreatePackPage />} />
                <Route path={QUERY_PARAM.PROFILE_PACKS} element={<UserPacksPage />} />
                <Route path={QUERY_PARAM.PROFILE_AVATAR} element={<AvatarEditorPage />} />
                <Route path={QUERY_PARAM.SEQUENCER} element={<SequencerPage />} />
                <Route path={QUERY_PARAM.LIKES} element={<LikedSamplesPage />} />
            </Routes>
        </>
    );
};
