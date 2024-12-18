/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'invoice-bg': "url('https://cdn.pixabay.com/photo/2024/05/21/08/19/invoice-8777297_640.png')",  // path relative to public folder
      },
    },
  },
  plugins: [],
  
}

