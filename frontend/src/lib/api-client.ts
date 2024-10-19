/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }
    config.withCredentials = false;
    return config;
}

class ApiClient {
    private api: AxiosInstance;

    constructor() {
        const instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
        this.api = instance;
        this.api.interceptors.request.use(authRequestInterceptor);
        this.api.interceptors.response.use(
            response => response.data,
            error => {
                const message = error.response?.data?.message || error.message;
                console.log("error", message);

                if (error.response?.status === 401) {
                    if (localStorage.getItem("token")) {
                        localStorage.removeItem("token");
                    }
                    window.location.href = `/unauthorized`;
                }
                if (error.response?.status === 403) {
                    window.location.href = `/403`;
                }
                return Promise.reject(error);
            }
        );
    }
    async get<T>(url: string, config = {}) {
        return this.api.get<T>(url, config);
    }

    async post<T>(url: string, data: any, config = {}) {
        return this.api.post<T>(url, data, config);
    }

    async put<T>(url: string, data: any, config = {}) {
        return this.api.put<T>(url, data, config);
    }

    async delete<T>(url: string, config = {}) {
        return this.api.delete<T>(url, config);
    }
}

export const apiClient = new ApiClient();
