import { $authHost, $host } from "."
import jwt_decode from "jwt-decode"

export const fetchGood = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}
export const AddGood = async (Dye) => {
    const {data} = await $host.post('api/basket',Dye)
    return data
}   