import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { AuthorizationLayout } from '../../layouts/AuthorizationLayout.tsx/AuthorizationLayout';

import styles from './RegistrationPage.module.scss';

export type FormProps = {
	name: string;
	email: string;
	password: string;
	password2: string;
};

export const RegisterFormSchema = yup.object().shape({
	name: yup.string().required('Введите свое имя'),
	email: yup
		.string()
		.email('Неверная почта')
		.required('Введите почту'),
	password: yup
		.string()
		.min(6, '​Минимальная длина пароля 6 символов')
		.required(),
	password2: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не соответствуют'),
});

export const RegistrationPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [password2, setPassword2] = useState<string>('');
	const [name, setName] = useState<string>('');

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword2(e.target.value);
	};


	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormProps>({
		resolver: yupResolver(RegisterFormSchema),
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
					className={styles.authBox}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles.authLabel}>
						<h1>Sign up Splice Account!</h1>
					</div>
					<div className={styles.textbox}>
						<input
							type='text'
							placeholder='Name'
							{...register('name')}
							value={name}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => onChangeName(e)}
						/>
						<p>{errors.name?.message}</p>
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
					<div className={styles.textbox}>
						<input
							type='password'
							placeholder='Repeat-Password'
							{...register('password2')}
							value={password2}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => onChangePassword2(e)}
						/>
						<p>{errors.password2?.message}</p>
					</div>
					<ButtonLayout typeStyle='auth'>Log in</ButtonLayout>
					<div className={styles.formFooter}>
						<p>У вас уже есть аккаунд?</p>
						<NavLink to='/login'>Sign up</NavLink>
					</div>
				</form>
			</AuthorizationLayout>
		</>
	);
};
