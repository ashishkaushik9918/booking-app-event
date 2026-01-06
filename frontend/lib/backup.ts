/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
const baseURL = process.env.NEXT_PUBLIC_API_URL
export const RequestAPI = createAlova({
    baseURL: baseURL,
    beforeRequest(method) { },
    requestAdapter: adapterFetch(),
    responded: {
        onSuccess: async (response, method) => {
            if (response.status == 401) {
                const data = await response.json();
                console.log(data, "data")
                if (data.success = false && data?.code === "ACCESS_TOKEN_EXPIRED") {
                    const refreshRes = await fetch(`${baseURL}/auth/refresh`, {
                        method: "POST",
                        credentials: "include",
                    });

                    if (!refreshRes.ok) {
                        window.location.href = "/login";
                        return;
                    }
                } else {
                    return data;
                }
            }

            if (response.status >= 400) {
                const result = await response.json()
                throw new Error(result.message);
            }
            const json = await response.json();
            if (json.code !== 200) {
                throw new Error(json.message);
            }
            return json.data;
        },
        onError: (error, method) => {
            console.log(error);
            alert(error.message);
        },


    }
});
