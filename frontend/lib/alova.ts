/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const RequestAPI = createAlova({
    baseURL: baseURL,
    beforeRequest(method) { },
    requestAdapter: adapterFetch(),
    responded: async (response) => {
        const data = await response.json();
        if (data?.code == "INVALID_ACCESS_TOKEN") {
            const result = await fetch(`${baseURL}/auth/refresh`, {
                method: "POST",
                credentials: "include"
            })
            if (!result.ok) {
                window.location.href = "/login";
                return;
            }
        }
        if (data?.success === false) {
            const error = new Error(
                data?.message || 'Something went wrong'
            ) as any;
            error.statusCode = data?.statusCode;
            error.raw = data;
            throw error;
        }
        if (!response.ok) {
            const error = new Error(
                data?.message?.message || response.statusText
            ) as any;
            error.statusCode = response.status;
            error.raw = data;
            throw error;
        }
        return data;
    }
});
