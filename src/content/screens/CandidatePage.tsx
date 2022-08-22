import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
interface IProps {
	scrapedCandidate: any
};
const CandidatePage:FC<IProps> = ({
	scrapedCandidate
}) => {
	return (
		<main className='container mt-3'>
			Candidate! {window.location.href}
		</main>
	)
}
const mapStateToProps = (state: RootState) => {
	const { candidate } = state;
	return {
		scrapedCandidate: candidate.scrapedCandidateInfo
	};
}
export default connect(mapStateToProps, {})(CandidatePage);
