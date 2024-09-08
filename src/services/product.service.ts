import axios from 'axios'
import categoryService from './category.service';
import brandService from './brand.service';
import colorService from './color.service';

const API_URL = import.meta.env.VITE_API_URL + "/api/products"

const getAll = async (page: number, pageSize: number, search: any) => await axios.get(API_URL, {
    params: {
        page: page, pageSize: pageSize, search: search ?? '',

    }
})

const fetchProductAttributes = async () => {
    const brands = await brandService.getAllBrands()
    const categories = await categoryService.getAllCategory()
    const color = await colorService.getAll()
    const data = {
        brands: brands.data,
        color: color.data,
        categories: categories.data,
    }
    return data
}

const create = async (data: any) =>
    await axios.post(API_URL + '/create', data)

const getProduct = async (id: number) =>
    await axios.get(API_URL + `/get/${id}`)

const update = async (id: any, data: any) =>
    await axios.put(API_URL + `/update/${id}`, data)

const remove = async (id: any) =>
    await axios.delete(API_URL + `/delete/${id}`)

const productService = {
    getAll,
    fetchProductAttributes,
    getProduct,
    create,
    update,
    remove
}
export default productService