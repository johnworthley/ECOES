import mongoose from 'mongoose'

const { Schema } = mongoose

let Post = null

try {
  const PostSchema = new Schema({
    _id: {
      timestamp: Number,
      author: String
    },
    author: String,
    project: String,
    description: String,
    dateTime: String,
    location: String,
    funding: String,
    likes: {
      type: Number,
      default: 0
    },
    postConfirmed: {
      type: Boolean,
      default: false
    }
  })
  Post = mongoose.model('Post', PostSchema)
} catch (e) {
  Post = mongoose.model('Post')
}

export default Post
