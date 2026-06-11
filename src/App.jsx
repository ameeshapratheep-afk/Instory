\export default function App() {
  return (
    <div className="bg-burgundy text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Card with burgundy border */}
        <div className="border-2 border-burgundy bg-black/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          
          <h1 className="text-4xl font-bold text-center mb-2">
            InStory
          </h1>
          
          <p className="text-white/80 text-center mb-8">
            Your burgundy themed app
          </p>

          {/* Burgundy button */}
          <button className="w-full bg-burgundy hover:bg-burgundy/80 active:bg-burgundy/60 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Started
          </button>

          {/* Secondary button with burgundy border */}
          <button className="w-full mt-4 border-2 border-burgundy hover:bg-burgundy text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            Login
          </button>
        </div>

      </div>
    </div>
  )
}