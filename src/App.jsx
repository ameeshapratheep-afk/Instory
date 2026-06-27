import { auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

function App() {
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        alert(`Welcome ${result.user.displayName}!`)
        console.log('User:', result.user)
      })
      .catch((error) => {
        console.error('Login error:', error)
        alert(error.message)
      })
  }

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fafafa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#800020', marginBottom: '10px' }}>InStory App</h1>
      <p style={{ color: '#333', marginBottom: '30px' }}>Firebase Auth connected</p>
      
      <button 
        onClick={loginWithGoogle}
        style={{
          backgroundColor: '#800020',
          color: 'white',
          padding: '14px 28px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(128,0,32,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#600018'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#800020'}
      >
        Login with Google
      </button>
    </div>
  )
}

export default App