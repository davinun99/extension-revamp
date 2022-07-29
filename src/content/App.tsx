import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { isCandidateUrl } from '../helpers';
import { GET_AUTH_MESSAGE, LOGIN_MESSAGE, URL_CHANGE_MESSAGE } from '../helpers/constants';
import { loginSuccess } from './redux/auth/actions';
import { goToHome, goToViewCandidate } from './redux/nav/actions';
import { CANDIDATE_PAGE, HOME_PAGE, LOGIN_PAGE } from './redux/nav/constants';
import { RootState } from './redux/store';
import CandidatePage from './screens/CandidatePage';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import './styles/main.scss';

interface IProps {
	currentPage: string, //from redux
	isAuthenticated: boolean, //from redux
	goToHome: Function, //from redux
	goToViewCandidate: Function, //from redux
	loginSuccess: Function //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({
	currentPage, isAuthenticated,
	goToHome, loginSuccess,
	goToViewCandidate
}) => {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const defaultCheckRedirect = (url : string = window.location.href) => {
		if (isCandidateUrl(url)) {
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
				defaultCheckRedirect(request.payload.url);
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
			defaultCheckRedirect();
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
	return cmp;
};
const mapStateToProps = (state: RootState) => {
	const { nav, auth } = state;
	return {
		currentPage: nav.currentPage,
		isAuthenticated: auth.isAuthenticated,
	};
}
export default connect(mapStateToProps, {
	loginSuccess,
	goToHome,
	goToViewCandidate,
})(App);
