import Head from 'next/head'
import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', username, password)
  }

  const burgundy = '#800020'
  const lightBurgundy = '#f5e6e9'
  const burgundyHover = '#6a001a'

  return (
    <>
      <Head>
        <title>InStory - Login</title>
        <style jsx global>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8f9fa;
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
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#1a1a1a'
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
              <a href="#" style={{
                fontSize: '13px',
                color: '#666',
                textDecoration: 'none'
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
                marginBottom: '25px'
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

          <button style={{
            width: '100%',
            padding: '12px',
            background: 'white',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '15px',
            cursor: 'pointer',
            marginBottom: '25px'
          }}>
            Continue with Google
          </button>

          <div style={{textAlign: 'center', fontSize: '14px', color: '#666'}}>
            Don't have an account? <a href="#" style={{color: burgundy, fontWeight: '600', textDecoration: 'none'}}>Sign up</a>
          </div>

          <div style={{textAlign: 'center', marginTop: '15px', fontSize: '13px'}}>
            <a href="#" style={{color: '#999', textDecoration: 'none'}}>Help Centre</a>
          </div>
        </div>
      </div>
    </>
  )
}
