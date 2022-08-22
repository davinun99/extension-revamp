import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { handleExtensionExpansion, isAuthenticatedOnStorage, isCandidateUrl } from '../helpers';
import { CLEAR_AUTH_MESSAGE, GET_AUTH_MESSAGE, LAST_PROFILES_VISITED_MESSAGE, LOGIN_MESSAGE, URL_CHANGE_MESSAGE } from '../helpers/constants';
import { getRecruiterAction, loginSuccess, logout, setLastVisitedProfiles } from './redux/auth/actions';
import { goToHome, goToCandidateScreen, goToLogin } from './redux/nav/actions';
import { CANDIDATE_PAGE, HOME_PAGE, LOGIN_PAGE } from './redux/nav/constants';
import { RootState } from './redux/store';
import CandidatePage from './screens/CandidatePage';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import './styles/main.scss';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ChevronLeft } from 'react-feather';
import { toggleScreen } from './redux/layout/actions';

interface IProps {
	currentPage: string, //from redux
	isAuthenticated: boolean, //from redux
	screenIsVisible: boolean, //from redux
	recruiter: Recruiter, //from redux
	goToHome: Function, //from redux
	goToCandidateScreen: Function, //from redux
	goToLogin: Function, //from redux
	toggleScreen: Function //from redux
	loginSuccess: Function //from redux
	setLastVisitedProfiles: Function //from redux
	logout: Function //from redux
	getRecruiterAction: Function //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({
	currentPage, isAuthenticated, screenIsVisible,
	recruiter,
	goToHome, loginSuccess,
	goToCandidateScreen, goToLogin,
	getRecruiterAction,
	toggleScreen,
	setLastVisitedProfiles,
	logout,
}) => {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const handleUrlChange = (url: string = window.location.href) => {
		if (!isAuthenticatedOnStorage()) {
			return;
		}
		if (isCandidateUrl(url)) {
			goToCandidateScreen(url, recruiter.recruiter_id);
		} else {
			goToHome();
		}
	};
	const handleLoginSuccess = (authData: AuthData) => {
		loginSuccess(authData);
		getRecruiterAction(authData.nimbl_user.user_id);
	}
	useEffect(() => { //This useEffect defines the listeners for the events on the App
		chrome.runtime.onMessage.addListener((request:BackgroundMessage, sender, sendResponse) => {
			const { message, payload } = request;
			if (message === LOGIN_MESSAGE && payload && 'tokens' in payload) {// Recieve and process the login msg.
				handleLoginSuccess(payload);
			}
			else if (message === GET_AUTH_MESSAGE && payload && 'tokens' in payload) {
				handleLoginSuccess(payload);
			}
			else if (message === URL_CHANGE_MESSAGE && payload && 'url' in payload) {
				handleUrlChange(payload.url); //The url has changed, handle the redirection
			}
			else if (message === LAST_PROFILES_VISITED_MESSAGE && payload instanceof Array<chrome.history.HistoryItem> ) {
				setLastVisitedProfiles(payload);
			}else if(message === CLEAR_AUTH_MESSAGE) {
				logout();
			}else if (request.error) {
				Swal.fire({ title: 'Error!' , text: `${request.error.message}. Message: ${request.message}`, icon: 'warning' });
			}
		});
		chrome.runtime.sendMessage({message: GET_AUTH_MESSAGE});
	}, []);
	useEffect( () => {
		if (isAuthenticated && isFirstLoad) {
			setIsFirstLoad(false);
			handleUrlChange();
		} else if (!isAuthenticated) {
			setIsFirstLoad(true);
			goToLogin();
		}
	}, [isAuthenticated, isFirstLoad]);
	const handleBackArrowClick = () => {
		handleExtensionExpansion(!screenIsVisible);
		toggleScreen();
	}
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
			<ChevronLeft className='backArrow' id="extensionBackArrow"
				onClick={handleBackArrowClick} 
			/>
		</div>
		<div className='screenContainer'>
			{cmp}
		</div>
	</main>);
};
const mapStateToProps = (state: RootState) => {
	const { nav, auth, layout } = state;
	return {
		currentPage: nav.currentPage,
		isAuthenticated: auth.isAuthenticated,
		screenIsVisible: layout.screenIsVisible,
		recruiter: auth.recruiter,
	};
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({
	loginSuccess: (authData: AuthData) => dispatch(loginSuccess(authData)),
	goToHome: () => dispatch(goToHome()),
	goToCandidateScreen: (url: string, managingRecruiterId: number) => dispatch(goToCandidateScreen(url, managingRecruiterId)),
	toggleScreen: () => dispatch(toggleScreen()),
	setLastVisitedProfiles: (lastVisitedProfiles: chrome.history.HistoryItem[]) => dispatch(setLastVisitedProfiles(lastVisitedProfiles)),
	goToLogin: () => dispatch(goToLogin()),
	logout: () => dispatch(logout()),
	getRecruiterAction: (userId: number) => dispatch(getRecruiterAction(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
