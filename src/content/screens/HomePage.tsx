import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { GET_AUTH_MESSAGE } from '../../helpers/constants';
import { RootState } from '../redux/store';

interface IProps {
	authData: any, //from redux
};
const HomePage:FC<IProps> = ({
	authData
}) => {
	return (
		<main className='container HomeContainer mt-3'>
			<h3 className='mt-3'>Welcome {authData?.google_user?.name}!</h3>
			<section className='mt-2'>
				<h5>Last visited profiles:</h5>
				<ul>
					<li>Jose's</li>
					<li>Manuel's</li>
				</ul>
			</section>
		</main>
	)
};
const mapStateToProps = (state: RootState) => {
	const { auth } = state;
	return { authData: auth.authData };
}
// const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({});
export default connect(mapStateToProps, {})(HomePage);
