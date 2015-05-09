import React from 'react';
import PlayerForm from './Players/PlayerForm';
import PlayerPreview from './Players/PlayerPreview';

const ReactPropTypes = React.PropTypes;

class Players extends React.Component {

	render() {
		return (
			<div className="players">
				<PlayerForm />
				<PlayerPreview />
			</div>
		);
	}

}

export default Players;
