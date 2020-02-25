import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    // baseURL: 'https://us-east4-your-final-grade.cloudfunctions.net/district-one-api/',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
