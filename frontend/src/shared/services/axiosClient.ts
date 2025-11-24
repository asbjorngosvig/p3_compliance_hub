import axios from "axios";

export const instance = axios.create({
    baseURL: "https://compliancehub.osc-fr1.scalingo.io/api", //URL for backend and API services
    headers: { "Content-Type": "application/json" },
    withCredentials: true // allows cookies <-
});

//nichzars Freaky ass tokens ',:- )
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; //sends a token with the http header which is stored in local storage
    }
    return config;
});
