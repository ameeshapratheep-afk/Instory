import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [posts, setPosts] = useState([])
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [fileType, setFileType] = useState('image')
  const fileInputRef = useRef()

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('instory_user')
    const savedPosts = localStorage.getItem('instory_posts')
    if (savedUser) {
      setCurrentUser(savedUser)
      setIsLoggedIn(true)
    }
    if (savedPosts) setPosts(JSON.parse(savedPosts))
  }, [])

  // Save posts
  useEffect(() => {
    localStorage.setItem('instory_posts', JSON.stringify(posts))
  }, [posts])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setFileType(selectedFile.type.startsWith('video')? 'video' : 'image')
    }
  }

  const handlePost = () => {
    if (!file ||!caption) return alert('Add file + caption Ma!')

    const newPost = {
      id: Date.now(),
      user: currentUser,
      caption,
      fileUrl: preview,
      fileType,
      likes: 0,
      comments: [],
      liked: false
    }

    setPosts([newPost,...posts]) // Add new post on TOP
    setCaption('')
    setFile(null)
    setPreview('')
    fileInputRef.current.value = ''
  }

  const handleLike = (id) => {
    setPosts(posts.map(p =>
      p.id === id
       ? {...p, likes: p.liked? p.likes - 1 : p.likes + 1, liked:!p.liked}
        : p
    ))
  }

  const handleComment = (id, comment) => {
    if (!comment) return
    setPosts(posts.map(p =>
      p.id === id
       ? {...p, comments: [...p.comments, {user: currentUser, text: comment}]}
        : p
    ))
  }

  const handleDelete = (id) => {
    if (confirm('Delete this post Ma?')) {
      setPosts(posts.filter(p => p.id!== id))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('instory_user')
    setIsLoggedIn(false)
    setCurrentUser('')
  }

  // Login/Signup UI - keeping your brown theme
  if (!isLoggedIn) {
    return <Login onLogin={(user) => {setCurrentUser(user); setIsLoggedIn(true); localStorage.setItem('instory_user', user)}} />
  }

  return (
    <div className="app">
      <header>
        <h1>Instory</h1>
        <div>
          <span>Hi {currentUser} 💛</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Create Post */}
      <div className="create-post">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {preview && fileType === 'image' && <img src={preview} className="preview" />}
        {preview && fileType === 'video' && <video src={preview} controls className="preview" />}
        <input
          placeholder="Write caption Ma..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      {/* FEED - Multiple Posts */}
      <div className="feed">
        {posts.length === 0? (
          <p className="no-posts">No posts yet Ma. Be the first! 📸</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <b>@{post.user}</b>
                {post.user === currentUser && (
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                )}
              </div>

              {post.fileType === 'image'
               ? <img src={post.fileUrl} className="post-media" />
                : <video src={post.fileUrl} controls className="post-media" />
              }

              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>
                  {post.liked? '❤️' : '🤍'} {post.likes}
                </button>
              </div>

              <p className="caption"><b>@{post.user}</b> {post.caption}</p>

              <div className="comments">
                {post.comments.map((c, i) => (
                  <p key={i}><b>@{c.user}</b> {c.text}</p>
                ))}
                <CommentBox onSend={(text) => handleComment(post.id, text)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Simple Login Component
function Login({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = () => {
    if (user && pass) {
      onLogin(user)
    } else alert('Enter username + password Ma')
  }

  return (
    <div className="login-box">
      <h2>Instory Login</h2>
      <input placeholder="Username" value={user} onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={handleSubmit}>Login / Signup</button>
    </div>
  )
}

// Comment Input
function CommentBox({ onSend }) {
  const [text, setText] = useState('')
  return (
    <div className="comment-box">
      <input
        placeholder="Add comment..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {onSend(text); setText('')}}>Post</button>
    </div>
  )
}

export default App