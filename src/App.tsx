import { Outlet, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/apolloClient';
import {
	PolishClasses,
	EnglishClasses,
	MathClasses,
	Translations,
	AboutUs,
	Curriculum,
	Lectors,
	Login,
	Register,
	UserPanel,
	TermsAndConditions,
	PageNotFound,
	ChangePassword,
	RecoverPassword,
} from './subpages';
import { Welcome, Idea, Offer, Motto, Contact } from './sections';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<Routes>
				<Route
					element={
						<>
							<Outlet />
							<Footer />
						</>
					}>
					<Route
						path='/'
						element={
							<>
								<Navbar />
								<Welcome />
								<Idea />
								<Offer />
								<Motto />
								<Contact />
							</>
						}
					/>
					<Route path='/jezyk-polski' element={<PolishClasses />} />
					<Route path='/jezyk-angielski' element={<EnglishClasses />} />
					<Route path='/matematyka' element={<MathClasses />} />
					<Route path='/tlumaczenia' element={<Translations />} />
					<Route path='/o-nas' element={<AboutUs />} />
					<Route path='/program-nauczania' element={<Curriculum />} />
					<Route path='/lektorzy' element={<Lectors />} />
					<Route path='/logowanie' element={<Login />} />
					<Route path='/odzyskiwanie-hasla' element={<RecoverPassword />} />
					<Route path='/rejestracja' element={<Register />} />
					<Route path='/polityka-prywatnosci' element={<TermsAndConditions />} />
				</Route>
				<Route
					path='/panel-uzytkownika'
					element={
						<>
							<UserPanel />
							<Outlet />
						</>
					}>
					<Route path='zmiana-hasla' element={<ChangePassword />} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</ApolloProvider>
	);
};

export default App;
