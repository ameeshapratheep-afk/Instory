import { useState } from 'react'
import './App.css'

function Post({ username, profilePic, image, caption, time }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [following, setFollowing] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleDoubleClick = () => {
    if (!liked) {
      setLikes(likes + 1)
      setLiked(true)
    }
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 800)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, newComment])
      setNewComment("")
    }
  }

  const handleFollow = () => {
    setFollowing(!following)
  }

  return (
    <div className="instory-container">
      <div className="instory-user-row">
        <img src={profilePic} alt="profile" className="profile-pic" />
        <div>
          <div className="instory-username">{username}</div>
          <div style={{fontSize: '12px', color: '#8E8E8E', marginTop: '2px'}}>{time}</div>
        </div>
        <button className="follow-btn" onClick={handleFollow}>
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
      
      <div style={{position: 'relative', marginTop: '10px'}}>
        <img 
          src={image} 
          alt="post" 
          onDoubleClick={handleDoubleClick}
          style={{
            width: '100%', 
            borderRadius: '8px',
            cursor: 'pointer',
            userSelect: 'none'
          }} 
        />
        {showHeart && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '80px',
            animation: 'heartPop 0.8s ease-out',
            pointerEvents: 'none'
          }}>
            ❤️
          </div>
        )}
      </div>
      
      <div style={{marginTop: '10px'}}>
        <button onClick={handleLike} style={{border: 'none', background: 'none', fontSize: '16px', cursor: 'pointer'}}>
          {liked ? '❤️' : '🤍'} {likes} likes
        </button>
      </div>
      
      <div style={{marginTop: '8px', fontWeight: '500'}}>{caption}</div>

      <div style={{marginTop: '12px'}}>
        {comments.map((comment, i) => (
          <div key={i} style={{marginBottom: '4px'}}>💬 {comment}</div>
        ))}
        <form onSubmit={handleComment}>
          <input 
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              width: '100%', 
              padding: '8px', 
              marginTop: '8px',
              border: '1px solid #DBDBDB',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </form>
      </div>
    </div>
  )
}

function App() {
  const posts = [
    {
      username: "aashu.codes",
      profilePic: "https://i.pravatar.cc/150?img=3",
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500",
      caption: "First Instory post 🚀",
      time: "2 hours ago"
    },
    {
      username: "design.drip",
      profilePic: "https://i.pravatar.cc/150?img=5",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500",
      caption: "Burgundy is the new black #instory",
      time: "5 hours ago"
    },
    {
      username: "code.with.me",
      profilePic: "https://i.pravatar.cc/150?img=8",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500",
      caption: "Debugging at 2am hits different",
      time: "1 day ago"
    },
    {
      username: "ui.ux.queen",
      profilePic: "https://i.pravatar.cc/150?img=1",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      caption: "Pixel perfect or nothing",
      time: "3 days ago"
    }
  ]

  return (
    <>
      <style>{`
        @keyframes heartPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          15% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          30% { transform: translate(-50%, -50%) scale(0.95); opacity: 1; }
          45% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
      <div>
        {posts.map((post, index) => (
          <Post 
            key={index}
            username={post.username}
            profilePic={post.profilePic}
            image={post.image}
            caption={post.caption}
            time={post.time}
          />
        ))}
      </div>
    </>
  )
}

export default App