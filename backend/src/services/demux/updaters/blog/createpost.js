async function createPost (state, payload, blockInfo, context) {
  const Post = state.post
  try {
    let post = await Post.find(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        }
      }
    ).exec()

    // if post already exists do not insert it in again
    if (post.length !== 0) return

    post = new Post(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        },
        author: payload.data.author,
        project: payload.data.project,
        description: payload.data.description,
        dateTime: payload.data.dateTime,
        location: payload.data.location,
        funding: payload.data.funding,
        postConfirmed: true
      }
    )
    await post.save()
  } catch (err) {
    console.error(err)
  }
}

export default createPost
