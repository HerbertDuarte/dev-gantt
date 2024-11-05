/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.vue', './index.html'],

    theme: {
        extend: {
            height: {
                content: 'calc(100dvh - 140px)', // Define a altura personalizada
            },
            minHeight: {
                content: 'calc(100dvh - 140px)',
            },
            maxHeight: {
                content: 'calc(100dvh - 140px)',
            },
        },
    },
    safelist: ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-green-800'],
};
