import React, {Component} from 'react'
import Upload from 'material-ui-upload/Upload'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {autobind} from 'core-decorators'
import sha1 from 'sha1'

class Form extends Component {
  state = {
    owner: ''
  }

  @autobind
  onChange(e) {
    this.setState({
      owner: e.target.value,
    });
  }

  @autobind
  onSubmit() {
    this.props.onSendProof({
      fileHash: this._fileHash,
      owner: this.state.owner
    });
  }

  @autobind
  onGetInfo() {
    this.props.onGetInfo(this._fileHash);
  }

  @autobind
  onFileLoad(e) {
    this._fileHash = sha1(e.target.result);
  }

  render() {
    return(
      <div>
        <h3>Upload File</h3>
        <div>
          <Upload onFileLoad={this.onFileLoad}/>
        </div>
        <div>
          <TextField
            hintText="Enter owner name"
            floatingLabelText="Owner Name"
            onChange={this.onChange}
            value={this.state.owner} />
        </div>
        <div>
          <FlatButton onClick={this.onSubmit} label="Submit" primary={true} />
          <FlatButton onClick={this.onGetInfo} label="Get Info" primary={true} />
        </div>
      </div>
    )
  }
}

export default Form
