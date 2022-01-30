import * as yup from 'yup';

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

export const RegisterFormSchema = yup.object().shape({
	fullname: yup.string().required('Введите свое имя'),
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

export const PackInfoSchema = yup.object().shape({
	genre: yup.string().required('Enter genre'),
	authorName: yup.string().required('Enter author name'),
	description: yup.string().required('Enter description'),
});
