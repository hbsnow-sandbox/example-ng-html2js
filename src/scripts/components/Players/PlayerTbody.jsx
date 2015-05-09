import React from 'react';

export default class PlayerTbody extends React.Component {

	static get propTypes() {
		return {
			players: React.PropTypes.array.isRequired
		}
	}

	render() {
		let cell = this.props.players.map((player) => {
			return (
				<tr key={player.id}>
					<td>{player.id}</td>
					<td>{player.name}</td>
				</tr>
			);
		});

		return <tbody>{cell}</tbody>;
	}

}
