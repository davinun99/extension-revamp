import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { LOGIN_MESSAGE } from '../helpers/constants';
import { loginSuccess } from './redux/auth/actions';
import { HOME_PAGE, LOGIN_PAGE } from './redux/nav/constants';
import { RootState } from './redux/store';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import './styles/main.scss';

interface IProps {
	currentPage: string, //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({ currentPage }) => {
	useEffect( () => { //This useEffect defines the listeners for the events on the App
		chrome.runtime.onMessage.addListener((request:BackgroundMessage, sender, sendResponse) => {
			if (request.message === LOGIN_MESSAGE) {// Recieve and process the login msg.
				loginSuccess(request.payload);
			}
			return true;
		});
	}, []);
	let cmp = <LoginPage/>
	switch (currentPage) {
		case LOGIN_PAGE:
		default:
			cmp = <LoginPage/>
			break;
		case HOME_PAGE: 
			cmp = <HomePage/>
			break;
	}
	return cmp;
};
const mapStateToProps = (state: RootState) => {
	const { nav } = state;
	return { currentPage: nav.currentPage };
}
export default connect(mapStateToProps, {loginSuccess})(App);
