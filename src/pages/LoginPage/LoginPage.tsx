import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { AuthorizationLayout } from '../../layouts/AuthorizationLayout/AuthorizationLayout';
import { selectAuth, selectErrorMessage } from '../../store/selectors/userSelectors';
import { LoginFormSchema } from '../../utils/useFormSchemas';
import { fetchLogin } from '../../store/slices/user/actions';

import styles from './LoginPage.module.scss';

export type FormProps = {
	email: string;
	password: string;
};

export const LoginPage = () => {
	const auth = useSelector(selectAuth);
	const errorMessage = useSelector(selectErrorMessage);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormProps>({
		resolver: yupResolver(LoginFormSchema),
	});

	const onSubmit = async (data: FormProps) => {
		dispatch(fetchLogin(data));
		reset();
	};

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	}, [auth]);

	return (
		<div data-testid='login-page'>
			<AuthorizationLayout>
				<form className={styles.authBox} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.authLabel}>
						<h1>Log In to Your Splice Account!</h1>
					</div>
					<div className={styles.textbox}>
						<input
							type='email'
							placeholder='Email'
							{...register('email')}
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEmail(e)}
						/>
						<p data-testid='error-valid-message'>{errors.email?.message}</p>
					</div>
					<div className={styles.textbox}>
						<input
							type='password'
							placeholder='Password'
							{...register('password')}
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangePassword(e)}
						/>
						<p>{errorMessage ? errorMessage : errors.password?.message}</p>
					</div>
					<button type='submit'>Log In</button>
					<div className={styles.formFooter}>
						<p>Don't have an account?</p>
						<NavLink to='/registration' data-testid='registration-link'>Sign up?</NavLink>
					</div>
				</form>
			</AuthorizationLayout>
		</div>
	);
};
