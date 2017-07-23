import React, {Component} from 'react'
import Upload from 'material-ui-upload/Upload'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import {autobind} from 'core-decorators'

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
    console.log(`${this.file}: ${this.state.owner}`)
  }

  @autobind
  onGetInfo() {
    console.log(`${this.file}: ${this.state.owner}`)
  }

  onFileLoad(e, file) {
    this._file = file;
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
            value={this.state.owner} />
        </div>
        <div>
          <FlatButton onclick={this.onSubmit} label="Submit" primary={true} />
          <FlatButton onClick={this.onGetInfo} label=">Get Info" primary={true} />
        </div>
      </div>
    )
  }
}

export default Form
