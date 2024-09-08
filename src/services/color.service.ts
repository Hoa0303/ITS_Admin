import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + "/api/color"

const getAll = async () => await axios.get(API_URL)

const create = async (data: any) =>
    await axios.post(API_URL + '/create', data)

const update = async (id: any, data: any) =>
    await axios.put(API_URL + `/update/${id}`, data)

const remove = async (id: any) =>
    await axios.delete(API_URL + `/delete/${id}`)

const colorService = {
    getAll,
    create,
    update,
    remove
}
export default colorService