import { Routes, Route } from 'react-router-dom';
import { FC, lazy } from 'react';

import { AvatarEditorPage } from '@pages/AvatarEditorPage';
import { CreatePackPage } from '@pages/CreatePackPage';
import { LoginPage } from '@pages/LoginPage';
import { PacksPage } from '@pages/PacksPage';
import { ProfilePackPage } from '@pages/ProfilePackPage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { SequencerPage } from '@pages/SequencerPage';
import { UserProfilePage } from '@pages/UserProfilePage';

import { QUERY_PARAM } from '@/constans/routing';
import withLazyComponent from '@/hocs/withLazyComponent';

const UserPacksPage = withLazyComponent(lazy(() => import('@pages/UserPacksPage')));
const LikedSamplesPage = withLazyComponent(lazy(() => import('@pages/LikedSamplesPage')));

export const AppRouter: FC = () => {
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
        <Route path={QUERY_PARAM.PROFILE_AVATAR} element={<AvatarEditorPage />} />
        <Route path={QUERY_PARAM.SEQUENCER} element={<SequencerPage />} />
        <Route path={QUERY_PARAM.LIKES} element={<LikedSamplesPage />} />
        <Route path={QUERY_PARAM.PROFILE_PACKS} element={<UserPacksPage />} />
      </Routes>
    </>
  );
};
