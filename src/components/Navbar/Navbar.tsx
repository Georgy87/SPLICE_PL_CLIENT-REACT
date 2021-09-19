import React from 'react';
import { BankOutlined,
LoginOutlined,
DownOutlined,
MenuOutlined,
CustomerServiceOutlined,
NotificationTwoTone,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import styles from './Navbar.module.scss';

const drawerWidth = 240;

const menuItems = [
	{ text: 'TRAP', href: '#' },
	{ text: 'CINEMA', href: '#' },
	{ text: 'FUTURE BASE', href: '#' },
];

export const Navbar = () => {
	const history = useHistory();

	return (
		<>
			<div className={`${styles.sidebar}`}>
				<div className={styles.logoDetails}>
					<CustomerServiceOutlined />
					<span className={styles.logoName}>SPLICE</span>
				</div>
				<ul className={styles.navLinks}>
					<li>
						<a onClick={() => history.push('/login')}>
							<LoginOutlined />
							<span className={styles.linkName}>Login</span>
						</a>
					</li>
					<li>
						<a onClick={() => history.push('/packs')}>
							<NotificationTwoTone />
							<span className={styles.linkName}>SAMPLES</span>
						</a>
					</li>
					<li>
						<div className={styles.iocnLink}>
							<a href='/'>
								<BankOutlined />
								<span className={styles.linkName}>PACKS</span>
							</a>
							<DownOutlined className={styles.arrow} />
						</div>
						<ul className={`${styles.subMenu}`}>
							{menuItems.map(({ text, href }, index) => {
								return (
									<li key={index}>
										<a className={styles.navLinks} onClick={() => history.push(href)} href={href}>
											{text}
										</a>
									</li>
								);
							})}
						</ul>
					</li>
				</ul>
			</div>

			<div className={styles.homeSection}>
				<div className={styles.homeContent}>
					<MenuOutlined />
					{/* <div className={styles.mainText}>
						Create, we'll do the rest.
					</div> */}
				</div>
			</div>
		</>
	);
};