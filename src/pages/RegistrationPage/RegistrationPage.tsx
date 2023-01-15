import { useState, FC, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '@store/types';

import { ButtonLayout } from '@layouts/ButtonLayout';
import { AuthorizationLayout } from '@layouts/AuthorizationLayout';
import { RegisterFormSchema } from '@utils/useFormSchemas';
import { fetchRegistration } from '@slices/user/actions';

import styles from './RegistrationPage.module.scss';

export type FormProps = {
	fullname: string;
	email: string;
	password: string;
	password2: string;
};

export const RegistrationPage: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [password2, setPassword2] = useState<string>('');
	const [fullName, setFullName] = useState<string>('');

	const dispatch = useAppDispatch();

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setFullName(e.target.value);
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>) => {
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
		const { email, password, fullname } = data;
		dispatch(fetchRegistration({ fullname, email, password }));
		reset();
	};

	return (
		<div data-testid='registration-page'>
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
							placeholder='Fullname'
							{...register('fullname')}
							value={fullName}
							onChange={(
								e: ChangeEvent<HTMLInputElement>,
							) => onChangeName(e)}
						/>
						<p>{errors.fullname?.message}</p>
					</div>
					<div className={styles.textbox}>
						<input
							type='email'
							placeholder='Email'
							{...register('email')}
							value={email}
							onChange={(
								e: ChangeEvent<HTMLInputElement>,
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
								e: ChangeEvent<HTMLInputElement>,
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
								e: ChangeEvent<HTMLInputElement>,
							) => onChangePassword2(e)}
						/>
						<p>{errors.password2?.message}</p>
					</div>
					<ButtonLayout typeStyle='auth'>Sign Up</ButtonLayout>
					<div className={styles.formFooter}>
						<p>Do you have an account?</p>
						<NavLink to='/login'>Log In</NavLink>
					</div>
				</form>
			</AuthorizationLayout>
		</div>
	);
};
