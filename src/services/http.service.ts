import axios from "axios";


const get = (url: string) => axios.get(url).then((res) => res.data)
const post = (url: string, data: any) => axios.post(url, data).then((res) => res.data)
const put = (url: string, data: any) => axios.put(url, data).then((res) => res.data)
const del = (url: string) => axios.delete(url).then((res) => res.data)

const httpService = {
    get,
    post,
    put,
    del
}
export default httpService;