import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from "material-ui/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

class EditPost extends Component {
  state = {
    project: this.props.post.project,
    description: this.props.post.description,
    dateTime: this.props.post.dateTime,
    location: this.props.post.location,
    funding: this.props.post.funding
  }

  handleOnChange = (event, field) => {
    this.setState({ [field]: event.target.value })
  }

  handlePostSave = () => {
    this.props.savePost({ ...this.props.post, ...this.state })
  }

  render () {
    return (
      <div className='card-item'>
        <div className='padding-30'>
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
          <button
            onClick={this.handlePostSave}
            type='submit'
            className='margin-right-15'
          >
            Update
          </button>
          <button
            onClick={this.props.toggleEditing}
            type='submit'
            className='secondary'
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}
EditPost.displayName = 'EditPost' // Tell React Dev Tools the component name

// Assign Prop Types
EditPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired
    }),
    author: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    funding: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
  }).isRequired,
  savePost: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired
}

export default EditPost