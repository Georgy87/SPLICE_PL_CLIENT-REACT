import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { AuthorizationLayout } from '../../layouts/AuthorizationLayout.tsx/AuthorizationLayout';

import styles from './LoginPage.module.scss';

export type FormProps = {
	email: string;
	password: string;
};

export const LoginFormSchema = yup.object().shape({
	email: yup
		.string()
		.email('Неверная почта')
		.required('Введите почту'),
	password: yup
		.string()
		.min(6, '​Минимальная длина пароля 6 символов')
		.required(),
});

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

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

	const onSubmit = (data: FormProps) => {
		const { email, password } = data;
		console.log(data);
		reset();
	};

	return (
		<>
			<AuthorizationLayout>
				<form
					className={styles.loginBox}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles.loginLabel}>
						<h1>Log In to Your Splice Account!</h1>
					</div>
					<div className={styles.textbox}>
						<input
							type='email'
							placeholder='Email'
							{...register('email')}
							value={email}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => onChangeEmail(e)}
						/>
						<p>{errors.email?.message}</p>
					</div>
					<div className={styles.textbox}>
						<input
							type='password'
							placeholder='Password'
							{...register('password')}
							value={password}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => onChangePassword(e)}
						/>
						<p>{errors.password?.message}</p>
					</div>
					<ButtonLayout typeStyle='auth'>Log in</ButtonLayout>
				</form>
			</AuthorizationLayout>
		</>
	);
};
