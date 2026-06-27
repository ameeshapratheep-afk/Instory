import { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, username, password)
      alert('Login successful!')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      alert('Google login successful!')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        
        <h1 className="text-4xl font-serif text-center mb-8">InStory</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-purple-100 rounded-lg border-none outline-none placeholder-gray-600"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-purple-100 rounded-lg border-none outline-none placeholder-gray-600"
          />
          
          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:underline">Forgot password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-purple-900 text-white rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-purple-900 font-semibold hover:underline">Sign up</a>
          </p>
          <a href="#" className="text-sm text-gray-600 hover:underline block">Help Centre</a>
        </div>

      </div>
    </div>
  )
}

export default App