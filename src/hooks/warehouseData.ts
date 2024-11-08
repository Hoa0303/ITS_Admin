import { ref } from "vue";

export interface WarehouseData {
  id: number;
  creator: string;
  note: string;
  total: number;
  entryDate: string;
  createAt: string;
}

export interface LogData {
  id: number;
  receiptId: number;
  creator: string;
  note: string;
  total: number;
  entryDate: string;
  createAt: string;
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

export interface LogDetail {
  id: number;
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

  const logData = ref<LogData[]>([]);
  function setLogData(data: LogData[]) {
    logData.value = data;
  }

  const warehouseDetail = ref<WarehouseDetail[]>([]);
  function setWarehouseDetail(data: WarehouseDetail[]) {
    warehouseDetail.value = data;
  }

  const logDetail = ref<LogDetail[]>([]);
  function setLogDetail(data: LogDetail[]) {
    logDetail.value = data;
  }

  return {
    warehousesData,
    warehouseDetail,
    logData,
    logDetail,
    setWarehouseData,
    setWarehouseDetail,
    setLogData,
    setLogDetail,
  };
}
