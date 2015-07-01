import React from 'react';
import PlayerTbody from './PlayerTbody';
import PlayerStore from '../../stores/PlayerStore';

export default class PlayerPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      players: PlayerStore.getAll()
    };
  }

  componentDidMount() {
    PlayerStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      players: PlayerStore.getAll()
    });
  }

  render() {
    let preview = <p>CSVを選択してください。</p>;

    if (this.state.players.length > 0) {
      preview = (
        <table>
          <thead>
            <tr>
              <td>背番号</td><td>名前</td>
            </tr>
          </thead>

          <PlayerTbody players={this.state.players} />
        </table>
      );
    }

    return (
      <div className="player-preview">
        {preview}
      </div>
    );
  }

}
