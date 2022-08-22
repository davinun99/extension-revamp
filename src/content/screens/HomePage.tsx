import React, { FC } from 'react';
import { LogOut } from 'react-feather';
import { connect } from 'react-redux';
import { CLEAR_AUTH_MESSAGE } from '../../helpers/constants';
import { RootState } from '../redux/store';
import { logout } from '../redux/auth/actions';

interface IProps {
	authData: AuthData, //from redux
	lastVisitedProfiles: chrome.history.HistoryItem[], //from redux
	logout: Function, //from redux
};
const HomePage:FC<IProps> = ({
	authData,
	lastVisitedProfiles,
	logout
}) => {
	const handleLogout = () => {
		chrome.runtime.sendMessage({message: CLEAR_AUTH_MESSAGE});
		logout();
	};
	return (
		<main className='container HomeContainer mt-3'>
			<section className="row mt-3">
				<h3 className="col-10">Welcome {authData.google_user.name}!</h3>
				<div className="col-2 d-flex align-items-center">
					<button onClick={handleLogout} title="Logout">
						<LogOut/>
					</button>
				</div>
			</section>
			<section className='mt-2'>
				<h5>Last visited profiles:</h5>
				<ul>
					{lastVisitedProfiles.map(historyItem => historyItem.url &&(
						<li key={historyItem.url}>
							<a href={historyItem.url}>{encodeURI(historyItem.url)}</a>
						</li>
					))}
				</ul>
			</section>
		</main>
	)
};
const mapStateToProps = (state: RootState) => {
	const { auth } = state;
	return {
		authData: auth.authData,
		lastVisitedProfiles: auth.lastVisitedProfiles,
	};
}
// const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({});
export default connect(mapStateToProps, {
	logout
})(HomePage);
