import React, { Component } from 'react'
import axios from 'axios'
import EOSIOClient from '../utils/eosio-client'
import IOClient from '../utils/io-client'
import { updatePostsForCreateAndEdit, updatePostsForLike, updatePostsForDelete } from '../utils/posts-updater'
import CreatePost from '../CreatePost/CreatePost'
import Posts from '../Posts/Posts'
import ButtonAppBar from '../components/appbarc'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ECOES from '../assets/images/ECOES.png'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'


class Home extends Component {

  state = {
    createOpen: false,
    posts: [],
  }

  // Instantiate shared eosjs helper and socket io helper
  constructor (props) {
    super(props)
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT
    this.eosio = new EOSIOClient(contractAccount)
    this.io = new IOClient()
    this.accountStore = this.props.accountStore
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount () {
    this.loadPosts()
    this.io.onMessage('createpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    })
    this.io.onMessage('editpost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    })
    this.io.onMessage('deletepost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }))
    })
    this.io.onMessage('likepost', (post) => {
      this.setState((prevState) => ({ posts: updatePostsForLike(prevState, post) }))
    })
  }

  // Load posts
  loadPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`)
    this.setState({ posts: response.data.reverse() })
  }

  // Create a post
  createPost = async (post) => {
    const {accountStore} = this.props;
    console.log("account name is " + accountStore.loginAccountInfo.account_name)

    try {
      const newPost = {
        ...post,
        _id: {
          timestamp: Math.floor(Date.now() / 1000),
          author: accountStore.loginAccountInfo.account_name
        },
        author: accountStore.loginAccountInfo.account_name
      }

      await this.eosio.transaction(
        accountStore.loginAccountInfo.account_name,
        'createpost', {
          timestamp: newPost._id.timestamp,
          author: newPost._id.author,
          ...post
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, newPost) }))
      this.toggleCreate()
    } catch (err) {
      console.error(err)
    }
  }

  // Edit a post
  editPost = async (post) => {
    try {
      await this.eosio.transaction(
        'editpost',
        {
          timestamp: post._id.timestamp,
          author: post._id.author,
          ...post
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForCreateAndEdit(prevState, post) }))
    } catch (err) {
      console.error(err)
    }
  }

  // Delete a post
  deletePost = async (post) => {
    try {
      await this.eosio.transaction(
        'deletepost',
        {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      )
      this.setState((prevState) => ({ posts: updatePostsForDelete(prevState, post) }))
    } catch (err) {
      console.error(err)
    }
  }

  // Like a post
  likePost = async (post) => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        'likepost', {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Toggle if create window is open
  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }))
  }

  render () {
    const { accountStore } = this.props
    console.log(accountStore)

    
    return (
      <div className="app">
        <ButtonAppBar />
        {accountStore.isLogin ? (
        <div className={`layoutStandard ${this.state.createOpen ? 'createOpen' : ''}`}>
          <div className='toggleCreate' onClick={this.toggleCreate} />
          <MuiThemeProvider>
            <CreatePost createPost={this.createPost} />
            <div className='cards'>
              <Posts
                posts={this.state.posts}
                accountStore={this.accountStore}
                onChange={this.handleOnChange}
                deletePost={this.deletePost}
                editPost={this.editPost}
                likePost={this.likePost}
              />
            </div>
            </MuiThemeProvider>
            </div>
            ) : (
          <img src={ECOES} width="1443" height="750" />
          )}
      </div>
    )
    
  }
}
Home.displayName = 'Home' // Tell React Dev Tools the component name

export default compose(
  inject('accountStore'),
  observer
)(Home)

//Ports
//4000-React
//3000-frontend