import axios from 'axios'
import httpService from './http.service';
import { Brand_API, Category_API, Color_API } from './api_url';

const API_URL = import.meta.env.VITE_API_URL + "/api/products"

const getAll = async (page: number, pageSize: number, search: any) => await axios.get(API_URL, {
    params: {
        page: page, pageSize: pageSize, search: search ?? '',

    }
})

const fetchProductAttributes = async () => {
    const brands = await httpService.get(Brand_API);
    const categories = await httpService.get(Category_API);
    const color = await httpService.get(Color_API);
    const data = {
        brands: brands,
        color: color,
        categories: categories,
    }
    return data
}

const create = async (data: any) =>
    await axios.post(API_URL + '/create', data)

const getProduct = async (id: number) =>
    await axios.get(API_URL + `/get/${id}`)

const update = async (id: any, data: any) =>
    await axios.put(API_URL + `/update/${id}`, data)

const updateEnable = async (id: number, data: any) =>
    await axios.put(API_URL + `/updateEnable/${id}`, data)

const remove = async (id: any) =>
    await axios.delete(API_URL + `/delete/${id}`)

const productService = {
    getAll,
    fetchProductAttributes,
    getProduct,
    create,
    update,
    updateEnable,
    remove
}
export default productService