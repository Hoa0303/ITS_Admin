const base = import.meta.env.VITE_API_URL + "/api"

export const Product_API: string = base + '/products';
export const Brand_API: string = base + '/brands';
export const Category_API: string = base + '/categories';
export const Color_API: string = base + '/colors';