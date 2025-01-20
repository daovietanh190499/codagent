/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jarkata Sans"],
      },
      colors: {
        "main-body-bg": "var(--main-body-bg)",
        "semi-main-body-bg": "var(--semi-main-body-bg)",
        "text-color": "var(--text-color)",
        "dark-gray-light": "var(--dark-gray-light)",
        "lines-dark": "var(--lines-dark)",
        "add-btn-bgcolor": "var(--add-btn-bgcolor)",
        "subtask-main-bg": "var(--subtask-main-bg)",
        "hide-side-bar-hover": "var(--hide-side-bar-hover)",
      },
    },
  },
  plugins: [],
};
