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
    safelist: [
        'bg-red-500/50',
        'bg-green-500/50',
        'bg-blue-500/50',
        'bg-green-800/50',
        'rounded-l-lg',
        'rounded-r-lg',
    ],
};
