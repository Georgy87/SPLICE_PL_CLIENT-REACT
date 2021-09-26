import React from 'react';
import { useHistory } from 'react-router-dom';

import { NavbarItem } from '../NavbarItem/NavbarItem';

import styles from '../Navbar/Navbar.module.scss';

type PacksListProps = {};

export const NavbarList: React.FC<PacksListProps> = () => {
	const history = useHistory();

	const navbarListItems = [
		{
			pageName: 'HOME',
			iconName: '',
		},
		{
			pageName: 'LOGIN',
			iconName: 'login',
		},
		{
			pageName: 'PACKS',
			iconName: 'packs',
		},
		{
			pageName: 'GENRES',
			iconName: 'genres',
		},
		{
			pageName: 'PROFILE',
			iconName: 'profile',
		},
	];

	const menuItems = [
		{ text: 'TRAP', href: '#' },
		{ text: 'CINEMA', href: '#' },
		{ text: 'FUTURE BASE', href: '#' },
	];

	// TODO ДОРАБОТАТЬ КОМПОНЕНТ

	return (
		<>
			<ul className={styles.navLinks}>
				{navbarListItems.map(({ pageName, iconName }, i) => (
					<NavbarItem pageName={pageName} iconName={iconName} />
				))}

				<li>
					{/* <div className={styles.iocnLink}>
						<a href='/'>
							<BankOutlined />
							<span className={styles.linkName}>GENRES</span>
						</a>
						<DownOutlined className={styles.arrow} />
					</div> */}

					<ul className={`${styles.subMenu}`}>
						{menuItems.map(({ text, href }, index) => {
							return (
								<li key={index}>
									<a
										className={styles.navLinks}
										onClick={() => history.push(href)}
										href={href}
									>
										{text}
									</a>
								</li>
							);
						})}
					</ul>
				</li>
			</ul>
		</>
	);
};