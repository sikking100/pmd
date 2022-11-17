const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{jsx,tsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'mint': '#CFF5E7',
                'teal': '#A0E4CB',
                'cold': '#59C1BD',
                'navy': '#0D4C92',
                'nav-hover': '#0D4C92'
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
