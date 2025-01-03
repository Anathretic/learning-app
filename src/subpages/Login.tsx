import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/Forms/LoginForm';
import { ResetPasswordForm } from '../components/Forms/ResetPasswordForm';
import { useCheckSessionStatus } from '../hooks/useCheckSessionStatus';
import { scrollToTop } from '../utils/scrollToTopUtils';

const Login: React.FC = () => {
	const [passwordReset, setPasswordReset] = useState(false);
	const { checkSessionStatus } = useCheckSessionStatus();

	useEffect(() => {
		checkSessionStatus();
	}, []);

	return (
		<section className='login'>
			<div className='login__container white-gradient'>
				<h2 className='login__title'>{passwordReset ? 'Zresetuj hasło' : 'Logowanie'}</h2>
				<Link to='/' className='login__close-button' onClick={scrollToTop}>
					X
				</Link>
				<hr className='login__strap' />
				<>
					{passwordReset ? (
						<ResetPasswordForm setPasswordReset={setPasswordReset} />
					) : (
						<>
							<LoginForm setPasswordReset={setPasswordReset} />
							<hr className='login__strap' />
							<div className='login__form-toggle'>
								<p>Nie masz jeszcze konta?</p>
								<Link to='/rejestracja' onClick={scrollToTop}>
									Rejestracja
								</Link>
							</div>
						</>
					)}
				</>
			</div>
		</section>
	);
};

export default Login;
