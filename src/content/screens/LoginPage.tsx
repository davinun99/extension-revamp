import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { RootState } from '../redux/store';
import { loginAction } from '../redux/auth/actions';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
interface IProps {
	loginAction: Function, //from redux
};
const LoginPage:FC<IProps> = (
	{ loginAction }
) => {
	const handleLogin = () => {
		loginAction();
	}
	return (
		<Container className='loginContainer'>
			<Button color='primary' className='extensionBtn' onClick={handleLogin}>
				Login
			</Button>
		</Container>
	)
}
const mapStateToProps = (state: RootState) => {
	return {  };
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({
	loginAction: () => dispatch(loginAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
