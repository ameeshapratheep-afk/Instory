import Head from 'next/head'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', email, password)
    // Your login logic here
  }

  return (
    <>
      <Head>
        <title>InStory - Login</title>
      </Head>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          width: '320px'
        }}>
          <h1 style={{textAlign: 'center', marginBottom: '30px'}}>InStory</h1>
          
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd'}}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd'}}
              required
            />
            <button type="submit" style={{
              width: '100%', 
              padding: '12px', 
              background: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
