import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '../supabase/supabase';
import { FormSubmit, InputElement } from '../components/InputAndTextarea';
import { useCheckSessionStatus } from '../hooks/useCheckSessionStatus';
import { LoginDataModel } from '../models/loginAndRegister.model';
import { loginSchema } from '../schemas/schemas';
import { scrollToTop } from '../utils/scrollToTopUtils';

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginDataModel>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});
	const navigate = useNavigate();
	const { checkSessionStatus } = useCheckSessionStatus();

	useEffect(() => {
		checkSessionStatus();
	}, []);

	const onSubmit: SubmitHandler<LoginDataModel> = async ({ email, password }) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (!error) {
			reset();
			navigate('/panel-uzytkownika');
		} else {
			console.log(error);
		}
	};

	return (
		<section className='login'>
			<div className='login__container white-gradient'>
				<h2 className='login__title'>Logowanie</h2>
				<hr className='login__strap' />
				<form className='form' onSubmit={handleSubmit(onSubmit)}>
					<InputElement
						label='E-mail:'
						inputName='email'
						type='text'
						placeholder='Wprowadź adres e-mail..'
						children={errors.email?.message}
						aria-invalid={errors.email ? true : false}
						{...register('email')}
					/>
					<InputElement
						label='Hasło:'
						inputName='password'
						type='password'
						placeholder='Wprowadź hasło..'
						children={errors.password?.message}
						aria-invalid={errors.password ? true : false}
						{...register('password')}
					/>
					<FormSubmit value='Zaloguj się' />
				</form>
				<hr className='login__strap' />
				<div className='login__form-toggle'>
					<p>Nie masz jeszcze konta?</p>
					<Link to='/rejestracja' onClick={scrollToTop}>
						Rejestracja
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
