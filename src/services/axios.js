'use client'
import axios from "axios";
import TokenService from "./tokenService";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = TokenService.getAccessToken();

    //checking if accessToken exists
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("test2");
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        //extracting response and config objects
        const { response, config } = error;
        //checking if error is Aunothorized error
        if (response.status === 401) {
            console.log("test3");
            let refreshToken = TokenService.getRefreshToken();
            if (refreshToken) {
                //if refresh token exists in local storage proceed
                try {
                    //try refreshing token
                    const data = await axiosInstance.post("/refresh/", {
                        refresh: refreshToken,
                    });
                    let accessToken = data.data.accessToken;
                    if (accessToken) {
                        //if request is successiful and token exists in response data
                        //store it in local storage
                        if(typeof window === 'undefined'){
                            return "";
                        }
                        localStorage.setItem("accessToken", accessToken);
                        
                        //with new token retry original request
                        config.headers["Authorization"] = accessToken;
                        return axiosInstance(config);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        //clear local storage and log user out
        logout();
        console.log("test4");
        return error;
    }
);

const logout = () => {
    console.log("Logout Function called");
    //handle logout
    TokenService.removeUserFromLocalStorage();
};

export { axiosInstance };
