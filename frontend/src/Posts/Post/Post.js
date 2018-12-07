import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditPost from 'Posts/EditPost/EditPost'

class Post extends Component {
  state = {
    editing: false,
    liked: false
  }

  toggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  likePost = (post) => {
    if (!this.state.liked) { // dapp does not support unliking for now
      this.setState(prevState => ({ liked: !prevState.liked }))
      this.props.likePost(post)
    }
  }

  savePost = (post) => {
    this.props.editPost(post)
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render () {
    return (
      !this.state.editing ? (
        <div className={`card-item ${this.state.liked ? 'liked' : ''}`} key={this.props.post.pkey}>
          <div className='padding-30'>
            <div className='heart' onClick={() => { this.likePost(this.props.post) }} />
            <h2 className='margin-top-0'>{this.props.post.project}</h2>
            <p>{this.props.post.description}</p>
            <p>{this.props.post.dateTime}</p>
            <p>{this.props.post.funding}</p>
          </div>
          <div className='padding-30 card-footer grid-3'>
            <div className='detailAvatar'>{this.props.post.author}</div>
            <div className='detailHeart'>{this.props.post.likes}</div>
            <div className='detailTag'>{this.props.post.location}</div>
          </div>
          <div className='padding-30 grid-2'>
            <div onClick={() => { this.props.deletePost(this.props.post) }} className='iconDelete' />
            <div onClick={this.toggleEditing} className='iconEdit' />
          </div>
        </div>
      ) : (
        <EditPost savePost={this.savePost} post={this.props.post} toggleEditing={this.toggleEditing} />
      )
    )
  }
}
Post.displayName = 'Post' // Tell React Dev Tools the component name

// Assign Prop Types
Post.propTypes = {
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
  editPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

export default Post