/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        colors: {
            main: "#03045e",
            accent: "#0077b6",
            white: "#ffffff",
            aqua: "#00b4d8",
            black: "#000000",
        },
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        extend: {},
    },
    plugins: [],
};