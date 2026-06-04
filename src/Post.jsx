import { useState } from 'react'

function Post({ username, profilePic, image, caption }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim() === '') return
    setComments([...comments, { text: newComment, user: 'you' }])
    setNewComment('')
  }

  return (
    <div className="instory-container">
      <div className="instory-user-row">
        <img src={profilePic} alt="profile" className="profile-pic" />
        <div className="instory-username">{username}</div>
      </div>
      
      <img 
        src={image} 
        alt="Instory post"
        className="instory-image"
      />
      
      <div className="instory-actions">
        <button onClick={handleLike} className="like-button">
          {liked ? '❤️' : '🤍'}
        </button>
        <p className="likes-count">{likes} likes</p>
        <p className="instory-caption">
          <strong>{username}</strong> {caption}
        </p>
        
        <div className="comments-section">
          {comments.map((comment, index) => (
            <p key={index} className="comment">
              <strong>{comment.user}</strong> {comment.text}
            </p>
          ))}
        </div>

        <form onSubmit={handleAddComment} className="comment-form">
          <input 
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
        </form>
      </div>
    </div>
  )
}

export default Post