import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


export default class CreatePost extends React.Component {
  state = {
    project: "",
    description: "",
    dateTime: "",
    location: "",
    funding: "",
  };
  

  handleOnChange = (event, field) => {
    this.setState({ [field]: event.target.value })
  }

  createPost = e => {
    e.preventDefault()
    this.props.createPost({ ...this.state, likes: 0 })
    this.setState({
      project: '',
      description: '',
      dateTime: '',
      location: '',
      funding: '',
    })
  }

  render() {
    return (
        <div className='createContainer padding-30'>
        <div className='card-item padding-30'>
        <TextField
          name="project"
          floatingLabelText="Project"
          value={this.state.project}
          onChange={(e) => this.handleOnChange(e, 'project')}
        />
        <br />
        <TextField
          name="description"
          floatingLabelText="Description"
          value={this.state.description}
          onChange={(e) => this.handleOnChange(e, 'description')}
          rows={4}
        />
        <br />
        <TextField
        floatingLabelText="Date and Time"
        type="datetime-local"
        value={this.state.dateTime}
        onChange={(e) => this.handleOnChange(e, 'dateTime')}
        rows={3}
      />
        <br />
        <TextField
          name="location"
          floatingLabelText="Location"
          value={this.state.location}
          onChange={(e) => this.handleOnChange(e, 'location')}
        />
        <br />
        <FormControl >
        <InputLabel htmlFor="adornment-amount">Funding</InputLabel>
          <Input
            name="funding"
            value={this.state.funding}
            onChange={(e) => this.handleOnChange(e, 'funding')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <br />
        <RaisedButton label="Submit" onClick={e => this.createPost(e)} primary />
        </div>
      </div>
    );
  }
}