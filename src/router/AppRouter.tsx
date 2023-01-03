import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { QUERY_PARAM } from '../constans/routing';

import { AvatarEditorPage } from '../pages';
import { CreatePackPage } from '../pages';
import { LikedSamplesPage } from '../pages';
import { LoginPage } from '../pages';
import { PacksPage } from '../pages';
import { ProfilePackPage } from '../pages';
import { RegistrationPage } from '../pages';
import { SequencerPage } from '../pages';
import { UserPacksPage } from '../pages';
import { UserProfilePage } from '../pages';

export const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path={QUERY_PARAM.LOGIN} element={<LoginPage />} />
                <Route path={QUERY_PARAM.REGISTRATION} element={<RegistrationPage />} />
                <Route path={QUERY_PARAM.FIRST_LOAD} element={<PacksPage />} />
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
