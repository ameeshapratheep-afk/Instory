export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InStory</h1>
          <p className="text-sm text-gray-600">Share your story, your way</p>
        </div>

        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="instory"
            className="w-full px-4 py-3 bg-blue-50 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-gray-900"
          />
          
          <input 
            type="password" 
            placeholder="••••"
            className="w-full px-4 py-3 bg-blue-50 rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-gray-900"
          />
          
          <div className="text-right">
            <a href="#" className="text-xs text-gray-500 hover:text-burgundy">Forgot password?</a>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition">
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <a href="#" className="text-burgundy font-medium hover:underline">Sign up</a>
        </p>
        
        <p className="text-center text-xs text-gray-400 mt-2">
          <a href="#" className="hover:text-burgundy">Help Centre</a>
        </p>
      </div>
    </div>
  )
}