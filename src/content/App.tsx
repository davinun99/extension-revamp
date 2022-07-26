import React, { FC } from 'react';
import { connect } from 'react-redux';
import { LOGIN_PAGE } from './redux/nav/constants';
import { RootState } from './redux/store';
import LoginPage from './screens/LoginPage';
import './styles/main.scss';

interface IProps {
	currentPage: string, //from redux
};

// This component is the entry point for the react app and acts as an navigator too
// It will use the nav redux store to direct the user to the different pages

const App: FC<IProps> = ({ currentPage }) => {
	let cmp = <LoginPage/>
	switch (currentPage) {
		case LOGIN_PAGE:
		default:
			cmp = <LoginPage/>
			break;
	}
	return cmp;
};
const mapStateToProps = (state: RootState) => {
	const { nav } = state;
	return { currentPage: nav.currentPage };
}
export default connect(mapStateToProps, {})(App);
