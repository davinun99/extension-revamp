import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
interface IProps {
};
const CandidatePage:FC<IProps> = (
) => {
	return (
		<main className='container mt-3'>
			Candidate! {window.location.href}
		</main>
	)
}
const mapStateToProps = (state: RootState) => {
	const { } = state;
	return {  };
}
export default connect(mapStateToProps, {})(CandidatePage);
