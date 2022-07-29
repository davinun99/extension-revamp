import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface IProps {
	
};
const HomePage:FC<IProps> = (
) => {
	return (
		<main className='container-fluid HomeContainer'>
			Home!
		</main>
	)
}
const mapStateToProps = (state: RootState) => {
	return {  };
}
const mapDispatchToProps = (dispatch :ThunkDispatch<any, any, AnyAction>) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
