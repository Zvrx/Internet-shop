import { $authHost, $host } from "."
import jwt_decode from "jwt-decode"

export const createType = async (type) => {
    //alert(JSON.stringify(type));
    const {data} = await $authHost.post('api/type',type)
    return data
}
export const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand',brand)
    return data
}
export const fetchBrand = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDye = async (Dye) => {
    const {data} = await $authHost.post('api/dye',Dye)
    return data
}
export const fetchDye = async () => {
    const {data} = await $host.get('api/dye')
    return data
}
export const fetchOneDye = async (id) => {
    const {data} = await $host.get('api/dye/'+ id)
    return data
}