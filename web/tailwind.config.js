/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    daisyui: {
        themes: [{
            mytheme: {

                "primary": "#03045e",

                "secondary": "#0077b6",

                "accent": "#7d19e8",

                "neutral": "#27263B",

                "base-100": "#3B525E",

                "info": "#5166D2",

                "success": "#19AE95",

                "warning": "#AC8E06",

                "error": "#FA5C61",
            },
        }, ],
    },
    plugins: [require("daisyui")],
};