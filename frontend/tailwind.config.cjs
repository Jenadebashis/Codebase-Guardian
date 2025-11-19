/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class', // gives you a class-based toggle for dark mode
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#111111",
        primary: {
          DEFAULT: "#FFD700",
          600: "#B89B00"
        },
        accent: "#FFFFFF",
        danger: "#FF4D6D",
        border: "#333333",
        text: {
          DEFAULT: "#FFFFFF",
          dim: "#CCCCCC"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      },
      boxShadow: {
        'neon-sm': '0 2px 10px rgba(255,215,0,0.06)',
        'neon-md': '0 8px 30px rgba(255,215,0,0.08)'
      },
      borderRadius: {
        'xl-2': '12px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    }
  },
  plugins: [],
}
