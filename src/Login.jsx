import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px'}}>InStory</h1>
        <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>Share your story, your way</p>

        {error && <div style={{background: '#fee', color: '#c00', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: '#e8f4ff',
              fontSize: '15px',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: '#e8f4ff',
              fontSize: '15px',
              boxSizing: 'border-box'
            }}
          />
          
          <div style={{textAlign: 'right', marginBottom: '20px'}}>
            <a href="#" style={{fontSize: '13px', color: '#666'}}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#800020',
              color: 'white',
              fontWeight: '600',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{display: 'flex', alignItems: 'center', margin: '25px 0'}}>
          <div style={{flex: 1, height: '1px', background: '#ddd'}}></div>
          <span style={{padding: '0 10px', color: '#999', fontSize: '13px'}}>OR</span>
          <div style={{flex: 1, height: '1px', background: '#ddd'}}></div>
        </div>

        <button 
          onClick={handleGoogle}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            background: 'white',
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Continue with Google
        </button>

        <p style={{textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#666'}}>
          Don't have an account? <a href="/signup" style={{color: '#800020', fontWeight: '600'}}>Sign up</a>
        </p>
        
        <p style={{textAlign: 'center', marginTop: '10px'}}>
          <a href="#" style={{fontSize: '13px', color: '#999'}}>Help Centre</a>
        </p>
      </div>
    </div>
  )
}