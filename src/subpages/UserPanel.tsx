import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { client } from '../apollo/apolloClient';
import { supabase } from '../supabase/supabase';
import { userDataGraph } from '../graphql/userdataGraph';
import { UserData } from '../models/userData.model';

const UserPanel: React.FC = () => {
	const navigate = useNavigate();

	const { data, error, loading, refetch } = useQuery(userDataGraph);

	useEffect(() => {
		if (data && !loading && !error) refetch();
	}, [data, loading, error, refetch]);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (!error) {
			client.resetStore().then(() => {
				navigate('/');
			});
		} else {
			console.log(error);
		}
	};

	return (
		<section>
			<h2>UserPanel</h2>
			{!error ? (
				!loading ? (
					<>
						{data.userdataCollection.edges.map((data: UserData, id: number) => (
							<div key={id}>
								<p>{data.node.user_id}</p>
								<p>{data.node.email}</p>
								<p>{id}</p>
							</div>
						))}
					</>
				) : (
					<div>Ładowanie.. </div>
				)
			) : (
				<div>Błąd..</div>
			)}
			<button type='button' onClick={logout}>
				Logout
			</button>
		</section>
	);
};

export default UserPanel;
