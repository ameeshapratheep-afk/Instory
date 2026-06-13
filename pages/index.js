import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1>Welcome to InStory 🔥</h1>
      <p>Hello {user.email || user.phoneNumber}</p>
      <button 
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          cursor: 'pointer',
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Logout
      </button>
    </div>
  )
}
