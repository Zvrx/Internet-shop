import axios from "axios";
export const Base = 'http://localhost:5000/'

const $host = axios.create({
    baseURL:Base
})

const $authHost = axios.create({
    baseURL:Base
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export{
    $host,
    $authHost
}