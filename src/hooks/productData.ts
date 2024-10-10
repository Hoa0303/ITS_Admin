import { ref } from 'vue';

export interface ProductsData {
    id: number;
    name: string;
    enable: boolean;
    discount: number;
    category: string;
    brand: string;
    imageUrl: string;
}

export function useTableData() {
    const productsData = ref<ProductsData[]>([]);
    function setProductData(data: ProductsData[]) {
        productsData.value = data
    }

    return {
        productsData,
        setProductData
    };
}

