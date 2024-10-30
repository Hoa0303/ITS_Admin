import { ref } from "vue";

export interface WarehouseData {
  id: number;
  creator: string;
  note: string;
  total: number;
  entryDate: string;
  createAt: string;
  //   updateAt: string;
}

export interface WarehouseDetail {
  id: number;
  productId: number;
  colorId: number;
  productName: string;
  colorName: string;
  costPrice: number;
  quantity: number;
}

export interface NameData {
  id: number;
  name: string;
}

export function useTableData() {
  const warehousesData = ref<WarehouseData[]>([]);
  function setWarehouseData(data: WarehouseData[]) {
    warehousesData.value = data;
  }

  const warehouseDetail = ref<WarehouseDetail[]>([]);
  function setWarehouseDetail(data: WarehouseDetail[]) {
    warehouseDetail.value = data;
  }

  return {
    warehousesData,
    warehouseDetail,
    setWarehouseData,
    setWarehouseDetail,
  };
}
