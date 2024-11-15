/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.vue', './index.html'],

    theme: {
        extend: {
            height: {
                content: 'calc(100dvh - 160px)', // Define a altura personalizada
                'gantt-row': '30px',
            },
            minHeight: {
                content: 'calc(100dvh - 160px)',
            },
            maxHeight: {
                content: 'calc(100dvh - 160px)',
            },
        },
    },
    safelist: [
        'bg-red-500/50',
        'bg-green-500/50',
        'bg-blue-500/50',
        'bg-green-800/50',
        'bg-yellow-500/50',
        'bg-gray-400/50',
        'rounded-l-lg',
        'rounded-r-lg',
        'border-l-0',
        'border-r-0',
        'bg-gray-400',
        'border-zinc-200/20',
    ],
};
