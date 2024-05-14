/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-blue": "#EEE4B1",
        "custom-purple": "#430A5D",
        "custom-brown": "#8C6A5D",
        "custom-cream": "#EEE4B1",
        "custom-darkpurple": "#32012F",
        "custom-coffee": "#5F374B",
        "card-color": "#FFFAE6",
      },
    },
  },
  plugins: [],
};
