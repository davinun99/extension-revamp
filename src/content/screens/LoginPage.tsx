import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Spinner } from 'reactstrap';
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
		<Container className='loginContainer'>
			{
				isLoading ? <Spinner size='sm'/> : 
				<Button color='primary' className='extensionBtn' onClick={handleLogin}>
					Login
				</Button>
			}
		</Container>
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
