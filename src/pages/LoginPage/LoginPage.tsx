import React from 'react';

import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
	return (
		<div className={styles.loginPage}>
			<div className={styles.bgImage}></div>
            <form className={styles.loginBox}>
				<h1>Login</h1>
				<div className={styles.textbox}>
					<input
						type='text'
						placeholder='Username'
						name=''
						value=''
					/>
				</div>
				<div className={styles.textbox}>
					<input
						type='password'
						placeholder='Password'
						name=''
						value=''
					/>
				</div>
				{/* <input type='button' className='btn' name='' value='Sign in' /> */}
            </form>
		</div>
	);
};
