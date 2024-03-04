import axios from "axios";
import config from '../config/config.json'
const API_URL = config.API_URL;
const axiosApi = axios.create({
    baseURL: API_URL,
});

// content type
axiosApi.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axiosApi.interceptors.response.use(function (response) {
    return response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
        case 500: message = "Internal Server Error"; break;
        case 401: message = "Invalid credentials"; break;
        case 404: message = "Sorry! the data you are looking for could not be found"; break;
        default: message = error.message || error;
    }
    return Promise.reject(message);
});

class ApiCore {
    /**
     * Fetches data from given url
     */
    get = (url, params = {}) => {
        return axiosApi.get(url, params);
    };

    /**
    * post given data to url
    */
    post = (url, data) => {
        return axiosApi.post(url, data);
    };
};

export { ApiCore };
