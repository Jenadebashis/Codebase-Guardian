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
        bg: "#0B0E14",
        surface: "#0F1420",
        primary: {
          DEFAULT: "#4CC9F0",
          600: "#26B6D9"
        },
        accent: "#7AE582",
        danger: "#FF4D6D",
        border: "#1F2430",
        text: {
          DEFAULT: "#E9ECEF",
          dim: "#9AA0AA"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"]
      },
      boxShadow: {
        'neon-sm': '0 2px 10px rgba(76,201,240,0.06)',
        'neon-md': '0 8px 30px rgba(76,201,240,0.08)'
      },
      borderRadius: {
        'xl-2': '12px'
      }
    }
  },
  plugins: [],
}
