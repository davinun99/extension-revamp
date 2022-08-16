import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { isCandidateUrl } from '../helpers';
import { GET_AUTH_MESSAGE, LOGIN_MESSAGE, URL_CHANGE_MESSAGE } from '../helpers/constants';
import { loginSuccess } from './redux/auth/actions';
import { goToHome, goToViewCandidate } from './redux/nav/actions';
import { getCandidateFromBackAction, getCandidateScrapedAction } from './redux/candidate/actions';
import { CANDIDATE_PAGE, HOME_PAGE, LOGIN_PAGE } from './redux/nav/constants';
import { RootState } from './redux/store';
import CandidatePage from './screens/CandidatePage';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import './styles/main.scss';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ChevronLeft } from 'react-feather';

interface IProps {
	currentPage: string, //from redux
	isAuthenticated: boolean, //from redux
	goToHome: Function, //from redux
	goToViewCandidate: Function, //from redux
	getCandidateFromBackAction: Function, //from redux,
	getCandidateScrapedAction: Function, //from redux
	loginSuccess: Function //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({
	currentPage, isAuthenticated,
	goToHome, loginSuccess,
	goToViewCandidate,
	getCandidateFromBackAction,
	getCandidateScrapedAction
}) => {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const handleUrlChange = (url: string = window.location.href) => {
		if (isCandidateUrl(url)) {
			getCandidateFromBackAction(url);
			getCandidateScrapedAction();
			goToViewCandidate();
		} else {
			goToHome();
		}
	};
	useEffect(() => { //This useEffect defines the listeners for the events on the App
		chrome.runtime.onMessage.addListener((request:BackgroundMessage, sender, sendResponse) => {
			if (request.message === LOGIN_MESSAGE && request.payload) {// Recieve and process the login msg.
				loginSuccess(request.payload);
			}
			else if (request.message === GET_AUTH_MESSAGE && request.payload) {
				loginSuccess(request.payload);
			}
			else if (request.message === URL_CHANGE_MESSAGE && request.payload && 'url' in request.payload) {
				handleUrlChange(request.payload.url); //The url has changed, handle the redirection
			}
			else if (request.error) {
				Swal.fire({ title: 'Error!' , text: `${request.error.message}. Message: ${request.message}`, icon: 'warning' });
			}
		});
		chrome.runtime.sendMessage({message: GET_AUTH_MESSAGE});
	}, []);
	useEffect( () => {
		if (isAuthenticated && isFirstLoad) {
			setIsFirstLoad(false);
			handleUrlChange();
		}
	}, [isAuthenticated, isFirstLoad]);
	let cmp = <LoginPage/>;
	switch (currentPage) {
		case LOGIN_PAGE:
		default:
			cmp = <LoginPage/>;
			break;
		case HOME_PAGE: 
			cmp = <HomePage/>;
			break;
		case CANDIDATE_PAGE:
			cmp = <CandidatePage/>;
	}
	return (<main className='extensionContainer'>
		<div className='expandArrowContainer'>
			<ChevronLeft className='backArrow' />
		</div>
		<div className='screenContainer'>
			{cmp}
		</div>
	</main>);
};
const mapStateToProps = (state: RootState) => {
	const { nav, auth } = state;
	return {
		currentPage: nav.currentPage,
		isAuthenticated: auth.isAuthenticated,

	};
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({
	loginSuccess: (authData: AuthData) => dispatch(loginSuccess(authData)),
	goToHome: () => dispatch(goToHome()),
	goToViewCandidate: () => dispatch(goToViewCandidate()),
	getCandidateFromBackAction: (url: string) => dispatch(getCandidateFromBackAction(url)),
	getCandidateScrapedAction: (recruiterId: number) => dispatch(getCandidateScrapedAction(recruiterId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
