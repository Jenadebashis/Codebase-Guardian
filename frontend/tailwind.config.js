
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#0a0a0a',
        'surface': '#1a1a1a',
        'primary': '#00ffcc',
        'secondary': '#ff00ff',
        'danger': '#ff3333',
        'success': '#22c55e',
        'warning': '#FFAE42',
        'text': '#e0e0e0',
        'text-dim': '#808080',
        'border': '#333333',
      },
      boxShadow: {
        'neon-sm': '0 0 5px rgba(0, 255, 204, 0.5), 0 0 10px rgba(0, 255, 204, 0.3)',
        'neon-md': '0 0 10px rgba(0, 255, 204, 0.6), 0 0 20px rgba(0, 255, 204, 0.4)',
        'neon-lg': '0 0 15px rgba(0, 255, 204, 0.7), 0 0 30px rgba(0, 255, 204, 0.5)',
      },
      borderRadius: {
        'xl-2': '1rem',
      },
    },
  },
  plugins: [],
}
