import { instance } from "./request";

export const loginRequest = async (data) => {
    return await instance.post('login',data)
}