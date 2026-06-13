import Head from 'next/head'
import { useState } from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const burgundy = '#800020'
  const lightBurgundy = '#f5e6e9'
  const burgundyHover = '#6a001a'

  const handleLogin = async (e) => {
    e.preventDefault()
    if(email.trim() === '' || password.trim() === '') {
      alert('❌ Please fill both Email and Password')
      return
    }
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert(`✅ Login Successful!\n\nWelcome to InStory`)
      setEmail('')
      setPassword('')
    } catch (error) {
      alert(`❌ Login Failed: ${error.message}`)
    }
    setLoading(false)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if(email.trim() === '' || password.trim() === '') {
      alert('❌ Please fill both Email and Password')
      return
    }
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert(`✅ Account Created!\n\nWelcome to InStory`)
      setEmail('')
      setPassword('')
    } catch (error) {
      alert(`❌ Signup Failed: ${error.message}`)
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      alert('✅ Google Login Successful!\n\nWelcome to InStory')
    } catch (error) {
      alert(`❌ Google Login Failed: ${error.message}`)
    }
    setLoading(false)
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    if(email.trim() === '') {
      alert('❌ Enter your email first to reset password')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      alert('✅ Password reset email sent! Check inbox')
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    }
  }

  const handleHelp = (e) => {
    e.preventDefault()
    alert('Help Centre\nSupport page coming soon')
  }

  return (
    <>
      <Head>
        <title>InStory - Login</title>
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          * {
            font-family: 'Lexend Deca', sans-serif !important;
          }
          body {
            margin: 0;
            background: #f8f9fa;
          }
          input:focus {
            border-color: ${burgundy} !important;
            box-shadow: 0 0 0 2px rgba(128, 0, 32, 0.1);
          }
        `}</style>
      </Head>

      <div style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '50px 40px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          width: '360px',
          maxWidth: '100%'
        }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#800020',
            letterSpacing: '1px'
          }}>
            InStory
          </h1>

          <form>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: '12px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                outline: 'none',
                background: lightBurgundy,
                boxSizing: 'border-box'
              }} 
              required
            />

            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: '8px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                outline: 'none',
                background: lightBurgundy,
                boxSizing: 'border-box'
              }} 
              required
            />

            <div style={{textAlign: 'right', marginBottom: '20px'}}>
              <a href="#" onClick={handleForgot} style={{
                fontSize: '13px',
                color: '#666',
                textDecoration: 'none',
                cursor: 'pointer'
              }}>Forgot password?</a>
            </div>

            <button 
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: burgundy,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '12px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <button 
            onClick={handleSignup}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'white',
              color: burgundy,
              border: `2px solid ${burgundy}`,
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '25px'
            }}
          >
            Sign up
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            color: '#999',
            fontSize: '13px'
          }}>
            <div style={{flex: 1, height: '1px', background: '#e0e0e0'}}></div>
            <span style={{padding: '0 12px'}}>OR</span>
            <div style={{flex: 1, height: '1px', background: '#e0e0e0'}}></div>
          </div>

          <button 
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '25px'
            }}
          >
            Continue with Google
          </button>

          <div style={{textAlign: 'center', marginTop: '15px', fontSize: '13px'}}>
            <a href="#" onClick={handleHelp} style={{color: '#999', textDecoration: 'none', cursor: 'pointer'}}>Help Centre</a>
          </div>
        </div>
      </div>
    </>
  )
}
