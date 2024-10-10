import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + "/api/colors"

const getAll = async () => await axios.get(API_URL)

const create = async (data: any) =>
    await axios.post(API_URL, data)

const update = async (id: any, data: any) =>
    await axios.put(API_URL + `/${id}`, data)

const remove = async (id: any) =>
    await axios.delete(API_URL + `/${id}`)

const colorService = {
    getAll,
    create,
    update,
    remove
}
export default colorService