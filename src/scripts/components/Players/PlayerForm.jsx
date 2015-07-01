import React from 'react';
import Papa from 'papaparse';
import PlaylerActions from '../../actions/PlayerActions';

export default class PlayerForm extends React.Component {
  handleChange(e) {
    let reader = new FileReader();

    reader.readAsText(e.target.files[0]);
    reader.onload = (upload) => {
      let csv = upload.target.result.replace(
        '背番号,名前',
        'id,name'
      );

      let json = Papa.parse(csv, { header: true });

      PlaylerActions.preview(json.data);
    };
  }

  render() {
    return (
      <form encType="multipart/form-data" id="player-form">
        <div className="form-group">
          <input type="file" onChange={this.handleChange.bind(this)}
                 accept=".csv" id="player-form-csv" />
        </div>
      </form>
    );
  }
}
