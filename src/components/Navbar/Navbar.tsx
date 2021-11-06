import React, { useEffect, useState } from 'react';
import { MenuOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import * as Icons from 'react-icons/fa';

import { Link, useHistory } from 'react-router-dom';

import { NavbarList } from '../NavbarList/NavbarList';

import styles from './Navbar.module.scss';

export const Navbar = () => {
	const [mobile, setModile] = useState(false);
	const [sidebar, setSideBar] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1065) {
				setModile(true);
			} else {
				setModile(false);
				setSideBar(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<>
			<nav className={styles.navbar}>
				<Link
					to='/'
					className={styles.navbarLogo}
					onClick={() => setSideBar(true)}
				>
					<CustomerServiceOutlined />
					SPLICE
				</Link>
				{sidebar ? (
					<Icons.FaTimes
						className={styles.sidebarToggleLogo}
						onClick={() => setSideBar(!sidebar)}
					/>
				) : (
					<Icons.FaBars
						className={styles.sidebarToggleLogo}
						onClick={() => setSideBar(!sidebar)}
					/>
				)}
				{!mobile && (
					<ul className='nav-items'>
						{/* {navItems.map((item) => {
							return (
								<li key={item.id} className={item.nName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})} */}
						<NavbarList />
					</ul>
				)}
				{!mobile && (
					<Link to='signup'>
						<button className='btn'>
							<Icons.FaUserPlus />
							<span>Sign Up</span>
						</button>
					</Link>
				)}

				{/* {mobile && (
					<div className='sidebar-toggle'>
						{sidebar ? (
							<Icons.FaTimes
								className='sidebar-toggle-logo'
								onClick={() => setSideBar(!sidebar)}
							/>
						) : (
							<Icons.FaBars
								className='sidebar-toggle-logo'
								onClick={() => setSideBar(!sidebar)}
							/>
						)}
					</div>
				)} */}
			</nav>
			<div className={sidebar ? 'sidebar active' : 'sidebar'}>
				<ul className='sidebar-items'>
					{/* {navItems.map((item) => {
						return (
							<li
								key={item.id}
								className={item.sName}
								onClick={() => setSideBar(false)}
							>
								<Link to={item.path}>
									{item.icon}
									<span>{item.title}</span>
								</Link>
							</li>
						);
					})} */}
					<NavbarList />
				</ul>
				{/* <Button onClick={() => setSideBar(false)} /> */}
				<Link to='signup'>
					<button className='btn'>
						<Icons.FaUserPlus />
						<span>Sign Up</span>
					</button>
				</Link>
			</div>
		</>
	);
};

{
	/* <div className={`${styles.sidebar}`}>`
				<div className={styles.logoDetails}>
					<CustomerServiceOutlined />
					<span className={styles.logoName}>SPLICE</span>
				</div>
				<NavbarList/>
			</div> */
}
