import { ref } from "vue";

export interface BrandsTableData {
  id: string;
  name: string;
  image: string;
}

export interface CategoryTableData {
  id: string;
  name: string;
}

export interface ColorTableData {
  id: string;
  name: string;
}

export interface ReviewTableData {
  id: string;
  description: string;
  start: number;
  fullName: string;
  createAt: string;
}

export function useTableData() {
  //Brands Data
  const brandsData = ref<BrandsTableData[]>([]);
  function setBrandsData(data: BrandsTableData[]) {
    brandsData.value = data;
  }

  //Category Data
  const categoriesData = ref<CategoryTableData[]>([]);
  function setcategoriesData(data: CategoryTableData[]) {
    categoriesData.value = data;
  }

  //Color Data
  const colorData = ref<ColorTableData[]>([]);
  function setColorData(data: ColorTableData[]) {
    colorData.value = data;
  }

  //Review Data
  const reviewData = ref<ReviewTableData[]>([]);
  function setReviewData(data: ReviewTableData[]) {
    reviewData.value = data;
  }

  return {
    brandsData,
    setBrandsData,
    categoriesData,
    setcategoriesData,
    colorData,
    setColorData,
    reviewData,
    setReviewData,
  };
}
