import { ref } from "vue";

export interface OrdersData {
  id: number;
  shippingCode: string;
  total: number;
  amountPaid: number;
  orderDate: string;
  paymentMethod: string;
  orderStatus: number;
  reviewed: boolean;
  payBackUrl: string;
}

export interface OrderDetailData {
  id: number;
  productOrderDetails: any;
  total: number;
  orderDate: string;
  deliveryAddress: string;
  receiver: string;
  phoneNumber: string;
  amountPaid: number;
}

export enum OrderSatus {
  "Processing",
  "Confirmed",
  "Shipping",
  "Received",
  "Done",
  "Canceled",
}

export enum ActionStatus {
  "Approve",
  "Delivery",
  "Receive",
  "Complete",
}

export function useTableData() {
  const ordersData = ref<OrdersData[]>([]);
  function setOrderData(data: OrdersData[]) {
    ordersData.value = data;
  }

  const oderDetailData = ref<OrderDetailData>();
  function setOrderDetailData(data: OrderDetailData) {
    oderDetailData.value = data;
  }

  return {
    ordersData,
    oderDetailData,
    setOrderData,
    setOrderDetailData,
  };
}
