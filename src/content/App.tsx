import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { handleExtensionExpansion, isCandidateUrl } from '../helpers';
import { GET_AUTH_MESSAGE, LAST_PROFILES_VISITED_MESSAGE, LOGIN_MESSAGE, URL_CHANGE_MESSAGE } from '../helpers/constants';
import { loginSuccess, setLastVisitedProfiles } from './redux/auth/actions';
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
	goToHome: Function, //from redux
	goToCandidateScreen: Function, //from redux
	goToLogin: Function, //from redux
	toggleScreen: Function //from redux
	loginSuccess: Function //from redux
	setLastVisitedProfiles: Function  //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({
	currentPage, isAuthenticated, screenIsVisible,
	goToHome, loginSuccess,
	goToCandidateScreen, goToLogin,
	toggleScreen,
	setLastVisitedProfiles,
}) => {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const handleUrlChange = (url: string = window.location.href) => {
		if (!isAuthenticated) {
			return;
		}
		if (isCandidateUrl(url)) {
			goToCandidateScreen(url, 1);
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
			else if (request.message === LAST_PROFILES_VISITED_MESSAGE && request.payload instanceof Array<chrome.history.HistoryItem> ) {
				setLastVisitedProfiles(request.payload);
			} else if (request.error) {
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
	};
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({
	loginSuccess: (authData: AuthData) => dispatch(loginSuccess(authData)),
	goToHome: () => dispatch(goToHome()),
	goToCandidateScreen: (url: string, managingRecruiterId: number) => dispatch(goToCandidateScreen(url, managingRecruiterId)),
	toggleScreen: () => dispatch(toggleScreen()),
	setLastVisitedProfiles: (lastVisitedProfiles: chrome.history.HistoryItem[]) => dispatch(setLastVisitedProfiles(lastVisitedProfiles)),
	goToLogin: () => dispatch(goToLogin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
