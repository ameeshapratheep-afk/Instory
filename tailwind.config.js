export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy:'#800020',
      },
    },
  },
  safelist: [
    'bg-burgundy', 'hover:bg-[#660018]', 'text-white', 'rounded-lg',
    'shadow-md', 'w-full', 'max-w-sm', 'mx-auto', 'p-8', 'space-y-4',
    'min-h-screen', 'flex', 'items-center', 'justify-center', 'border',
    'border-gray-300', 'focus:border-burgundy', 'focus:ring-2', 'focus:ring-burgundy'
  ],
  plugins: [],
}