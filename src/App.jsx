import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [currentUser, setCurrentUser] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState('')

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    if (password!== confirmPassword) return setError('Passwords do not match')
    const users = JSON.parse(localStorage.getItem('instory_users') || '[]')
    if (users.find(u => u.username === username)) return setError('Username already taken')
    users.push({ username, email, password })
    localStorage.setItem('instory_users', JSON.stringify(users))
    alert(`Account created! Welcome ${username}`)
    setIsLogin(true)
    setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    const users = JSON.parse(localStorage.getItem('instory_users') || '[]')
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(user.username)
      const savedPosts = JSON.parse(localStorage.getItem(`posts_${user.username}`) || '[]')
      setPosts(savedPosts)
      setUsername(''); setPassword('')
    } else setError('Invalid username or password')
  }

  const handleLogout = () => {
    localStorage.setItem(`posts_${currentUser}`, JSON.stringify(posts))
    setIsLoggedIn(false)
    setPosts([])
    setCaption('')
    setImage(null)
    setCommentText('')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handlePost = (e) => {
    e.preventDefault()
    if (!caption.trim() &&!image) return
    const newPost = {id: Date.now(), username: currentUser, caption: caption, image: image, likes: 0, comments: []}
    const updatedPosts = [newPost,...posts]
    setPosts(updatedPosts)
    setCaption('')
    setImage(null)
  }

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => post.id === postId? {...post, likes: post.likes + 1} : post)
    setPosts(updatedPosts)
  }

  const handleComment = (postId, e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    const updatedPosts = posts.map(post =>
      post.id === postId
     ? {...post, comments: [...(post.comments || []), {user: currentUser, text: commentText}]}
      : post
    )
    setPosts(updatedPosts)
    setCommentText('')
  }

  const handleDelete = (postId) => {
    if (window.confirm('Delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== postId)
      setPosts(updatedPosts)
      localStorage.setItem(`posts_${currentUser}`, JSON.stringify(updatedPosts))
    }
  }

  if (isLoggedIn) {
    return (
      <div>
        <nav style={{padding: '1rem', background: 'white', borderBottom: '2px solid #800020', display: 'flex', justifyContent: 'space-between'}}>
          <h2>Instory</h2>
          <button onClick={handleLogout} style={{padding: '8px 16px', background: '#800020', color: 'white', border: 'none', borderRadius: '4px'}}>Logout</button>
        </nav>
        <div style={{maxWidth: '600px', margin: '2rem auto', padding: '1rem'}}>
          <h1>Welcome {currentUser}!</h1>

          <div style={{background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem'}}>
            <form onSubmit={handlePost}>
              <textarea placeholder="Write caption..." value={caption} onChange={(e) => setCaption(e.target.value)} rows="3" style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}/>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{margin: '10px 0', width: '100%'}}/>
              {image && <img src={image} alt="preview" style={{width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px'}}/>}
              <button type="submit" style={{width: '100%', padding: '10px', background: '#800020', color: 'white', border: 'none', marginTop: '10px'}}>Post</button>
            </form>
          </div>

          {posts.length === 0? <p>No posts yet</p> :
            posts.map(post => (
              <div key={post.id} style={{background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem'}}>
                <p><strong>@{post.username}</strong></p>
                {post.image && <img src={post.image} alt="post" style={{width: '100%', borderRadius: '8px', marginBottom: '10px'}}/>}
                <p>{post.caption}</p>
                <button onClick={() => handleLike(post.id)} style={{padding: '8px 12px', background: '#800020', color: 'white', border: 'none', borderRadius: '4px'}}>❤️ {post.likes}</button>

                <div style={{marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee'}}>
                  {(post.comments || []).map((c, i) => (
                    <p key={i} style={{fontSize: '0.9rem', margin: '4px 0'}}><strong>@{c.user}:</strong> {c.text}</p>
                  ))}
                  <form onSubmit={(e) => handleComment(post.id, e)} style={{display: 'flex', marginTop: '8px'}}>
                    <input type="text" placeholder="Add comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}/>
                    <button type="submit" style={{padding: '8px 12px', background: '#800020', color: 'white', border: 'none', marginLeft: '5px', borderRadius: '4px'}}>Post</button>
                  </form>
                </div>

                {post.username === currentUser && (
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    style={{marginTop: '10px', padding: '6px 12px', background: '#ed4956', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', width: '100%'}}
                  >
                    🗑️ Delete Post
                  </button>
                )}

              </div>
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fafafa'}}>
      <div style={{background: 'white', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '350px'}}>
        <h1 style={{color: '#800020', textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem'}}>Instory</h1>
        <p style={{textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem'}}>Share your story, your way</p>

        <form onSubmit={isLogin? handleLogin : handleSignup}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} />
          {!isLogin && <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} />}
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} />
          {!isLogin && <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} />}
          {error && <p style={{color: 'red', fontSize: '0.8rem', textAlign: 'center', margin: '8px 0'}}>{error}</p>}

          {isLogin && <p style={{textAlign: 'right', fontSize: '0.8rem', color: '#800020', cursor: 'pointer', margin: '4px 0'}}>Forgot password?</p>}

          <button type="submit" style={{width: '100%', padding: '12px', background: '#800020', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px', fontWeight: 'bold'}}>{isLogin? "Login" : "Sign Up"}</button>
        </form>

        <div style={{textAlign: 'center', margin: '1rem 0', color: '#999', fontSize: '0.8rem'}}>OR</div>

        <button type="button" onClick={() => alert('Google login coming later!')} style={{width: '100%', padding: '12px', background: 'white', color: '#333', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem'}}>Continue with Google</button>

        <p style={{textAlign: 'center', fontSize: '0.9rem', marginTop: '1rem'}}>
          {isLogin? "Don't have an account?" : "Already have an account?"}
          <span style={{color: '#800020', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {setIsLogin(!isLogin); setError('')}}> {isLogin? "Sign up" : "Login"}</span>
        </p>

        <p style={{textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '1.5rem'}}>Help Centre</p>
      </div>
    </div>
  )
}
export default App