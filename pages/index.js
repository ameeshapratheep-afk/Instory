import Head from 'next/head'
import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const burgundy = '#800020'
  const lightBurgundy = '#f5e6e9'
  const burgundyHover = '#6a001a'

  const handleSubmit = (e) => {
    e.preventDefault()
    if(username.trim() === '' || password.trim() === '') {
      alert('❌ Please fill both Username and Password')
      return
    }
    alert(`✅ Login Successful!\n\nWelcome ${username} to InStory\nNote: This is demo success. Real database check coming next.`)
    setUsername('')
    setPassword('')
  }

  const handleGoogle = () => {
    alert('Continue with Google\nFirebase connection coming next')
  }

  const handleForgot = (e) => {
    e.preventDefault()
    alert('Forgot password\nReset link feature coming soon')
  }

  const handleSignup = (e) => {
    e.preventDefault() 
    alert('Sign up\nRegistration page coming soon')
  }

  const handleHelp = (e) => {
    e.preventDefault()
    alert('Help Centre\nSupport page coming soon')
  }

  return (
    <>
      <Head>
        <title>InStory - Login</title>
        <link href="https://fonts.cdnfonts.com/css/utendo" rel="stylesheet" />
        <style jsx global>{`
          * {
            font-family: 'Utendo', sans-serif !important;
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

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e)=>setUsername(e.target.value)} 
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: '12px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                outline: 'none',
                background: lightBurgundy,
                boxSizing: 'border-box',
                transition: 'all 0.2s'
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
                boxSizing: 'border-box',
                transition: 'all 0.2s'
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
              type="submit" 
              style={{
                width: '100%',
                padding: '14px',
                background: burgundy,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '25px',
                transition: 'background 0.2s',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => e.target.style.background = burgundyHover}
              onMouseOut={(e) => e.target.style.background = burgundy}
            >
              Login
            </button>
          </form>

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
            style={{
              width: '100%',
              padding: '12px',
              background: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: 'pointer',
              marginBottom: '25px',
              transition: 'border 0.2s'
            }}
            onMouseOver={(e) => e.target.style.borderColor = burgundy}
            onMouseOut={(e) => e.target.style.borderColor = '#ddd'}
          >
            Continue with Google
          </button>

          <div style={{textAlign: 'center', fontSize: '14px', color: '#666'}}>
            Don't have an account? <a href="#" onClick={handleSignup} style={{color: burgundy, fontWeight: '600', textDecoration: 'none', cursor: 'pointer'}}>Sign up</a>
          </div>

          <div style={{textAlign: 'center', marginTop: '15px', fontSize: '13px'}}>
            <a href="#" onClick={handleHelp} style={{color: '#999', textDecoration: 'none', cursor: 'pointer'}}>Help Centre</a>
          </div>
        </div>
      </div>
    </>
  )
}
