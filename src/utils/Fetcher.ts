import axios from "axios";

export interface ApiResponse {
    error: boolean;
    message: string;
};

export interface ApiResponseWithPayload<T> extends ApiResponse {
    error: false;
    payload: T;
};

export interface ApiResponseError extends ApiResponse {
    error: true;
};

export type ApiResponsePayload<T> = ApiResponseWithPayload<T> | ApiResponseError;

export const saeAPI = axios.create({
    baseURL: "http://192.168.4.1:80",
});

type Temperatures = {
    celsius: number;
    kelvin: number;
}

export const getTemperatures = async (): Promise<ApiResponsePayload<Temperatures>> => {
    try {
        const { data } = await saeAPI.get<Temperatures>("/");

        return {
            error: false,
            message: "Temperatura obtenida",
            payload: data
        };
    } catch (error: unknown) {
        console.log(error);

        return {
            error: true,
            message: "Ocurrió un error obteniendo la temperatura",
        };
    };
};
