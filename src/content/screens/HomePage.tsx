import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';

interface IProps {
	authData: AuthData, //from redux
	lastVisitedProfiles: chrome.history.HistoryItem[], //from redux
};
const HomePage:FC<IProps> = ({
	authData,
	lastVisitedProfiles
}) => {
	return (
		<main className='container HomeContainer mt-3'>
			<h3 className='mt-3'>Welcome {authData.google_user.name}!</h3>
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
export default connect(mapStateToProps, {})(HomePage);
