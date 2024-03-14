/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path to match your React components
  ],
  theme: {
    extend: {
      colors: {
        // Colors inspired by Gosuslugi website (replace with actual colors if needed):
        'gosu-blue': '#007bff',
        'gosu-gray': '#f8f9fa',
        'gosu-dark-gray': '#6c757d',
      },
    },
  },
  plugins: [],
};


