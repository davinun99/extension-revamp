import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { loginAction } from '../redux/auth/actions';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
interface IProps {
	isLoading: boolean, //from redux
	loginAction: Function, //from redux
};
const LoginPage:FC<IProps> = (
	{ isLoading, loginAction }
) => {
	const handleLogin = () => {
		loginAction();
	}
	return (
		<main className='loginContainer'>
			{
				isLoading ? 
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				: 
				<button className='btn btn-primary extensionBtn' onClick={handleLogin}>
					Login
				</button>
			}
		</main>
	)
}
const mapStateToProps = (state: RootState) => {
	const { isLoading } = state.auth;
	return { isLoading };
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({
	loginAction: () => dispatch(loginAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
