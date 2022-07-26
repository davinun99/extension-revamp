import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import { RootState } from '../redux/store';
import { login } from '../redux/auth/actions';
interface IProps {
	login: Function, //from redux
};
const LoginPage:FC<IProps> = (
	{ login }
) => {
	const handleLogin = () => {
		login();
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
export default connect(mapStateToProps, {
	login
})(LoginPage);
