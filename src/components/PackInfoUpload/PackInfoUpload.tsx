import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { PackInfoSchema } from '../../utils/useFormSchemas';

import styles from './PackInfoUpload.module.scss';

type PropsType = {
	setInfo: Function;
};

export type FormProps = {
	genre: string;
	authorName: string;
	description: string;
};

export const PackInfoUpload: React.FC<PropsType> = ({ setInfo }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormProps>({
		resolver: yupResolver(PackInfoSchema),
	});

	const onSubmit = (data: FormProps) => {
		const { genre, authorName, description } = data;

		setInfo({
			genre,
			authorName,
			packInfo: description,
		});

		reset();
	};

	return (
		<>
			<form className={styles.packUploadWrapper} onSubmit={handleSubmit(onSubmit)}>
				<label>GENRE</label>
				<input type='text' {...register('genre')} />
				<p>{errors.genre?.message}</p>

				<label>AUTHOR NAME</label>
				<input type='text' {...register('authorName')} />
				<p>{errors.authorName?.message}</p>

				<label>DESCRIPTION</label>
				<textarea {...register('description')} />
				
				<p>{errors.description?.message}</p>
				
				<ButtonLayout typeStyle='black'>
					SAVE INFO
				</ButtonLayout>
			</form>
		</>
	);
};
