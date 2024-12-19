import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    transformResponse: [(data) => convertDates(JSON.parse(data))],
});
function convertDates(obj: any): any {
    const isoDateRegex =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

    if (typeof obj === 'string' && isoDateRegex.test(obj)) {
        return new Date(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(convertDates);
    }

    if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = convertDates(obj[key]);
            }
        }
    }

    return obj;
}

export { api };
