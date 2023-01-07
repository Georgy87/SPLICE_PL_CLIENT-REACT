import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { NavbarList } from '../NavbarList/NavbarList';
import { Sidebar } from '../Sidebar/Sidebar';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { selectAuth, selectUser } from '../../store/selectors/userSelectors';
import { logout } from '../../store/slices/user/userSlice';
import { setDefaultPackState } from '../../store/slices/pack/packSlice';
import defaultAvatar from '../../assets/avatar/unnamed.jpg';
import { useAppDispatch } from '../../store/types';

import styles from './Navbar.module.scss';

export const Navbar = () => {
    const [sidebar, setSideBar] = useState(false);
    const user = useSelector(selectUser);

    const dispatch = useAppDispatch();

    const isAuth = useSelector(selectAuth);
    return (
        <>
            <nav className={isAuth ? styles.navbar : `${styles.navbar} ${styles.notAuth}`}>
                <Link to="/" data-testid="packs-link" className={styles.navbarLogo} onClick={() => setSideBar(true)}>
                    <IconLayout iconName={'music'} />
                    <span className={styles.logo}>SampleCloud</span>
                </Link>

                {sidebar ? (
                    <Icons.FaTimes className={styles.sidebarToggleLogo} onClick={() => setSideBar(!sidebar)} />
                ) : (
                    <Icons.FaBars className={styles.sidebarToggleLogo} onClick={() => setSideBar(!sidebar)} />
                )}

                {isAuth ? <NavbarList /> : null}
                {isAuth && (
                    <div className={styles.avatar}>
                        <img src={user?.avatar ? user.avatar : defaultAvatar} alt="user-avatar" />
                    </div>
                )}
                {
                    <Link to="/login" data-testid="login-link">
                        {isAuth ? (
                            <ButtonLayout
                                typeStyle={'sign-in-out'}
                                onClicked={() => {
                                    dispatch(logout());
                                    dispatch(setDefaultPackState());
                                }}
                            >
                                <IconLayout iconName={'login'} />
                                <span>Log Out</span>
                            </ButtonLayout>
                        ) : (
                            <ButtonLayout typeStyle={'sign-in-out'}>
                                <IconLayout iconName={'logout'} />
                                <span>Log In</span>
                            </ButtonLayout>
                        )}
                    </Link>
                }
            </nav>
            {sidebar && <Sidebar sidebar={sidebar} setSideBar={setSideBar} />}
        </>
    );
};
