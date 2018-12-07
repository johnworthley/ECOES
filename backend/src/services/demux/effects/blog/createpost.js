function createPost (state, payload, blockInfo, context) {
  const post = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    },
    author: payload.data.author,
    project: payload.data.project,
    description: payload.data.description,
    dateTime: payload.data.dateTime,
    location: payload.data.location,
    funding: payload.data.funding
  }
  context.socket.emit('createpost', post)
}

export default createPost
