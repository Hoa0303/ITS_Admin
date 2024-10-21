<template>
  <h3 class="text-gray-700 text-3xl font-medium">Orders Detail</h3>

  <div class="mt-5">

    <div class="">
      <a-form layout="vertical">
        <div class="grid grid-cols-2 gap-3">
          <a-form-item label="Receiver">
            <a-input :value="oderDetailData?.receiver" class="rounded-lg h-9 border-gray-300 w-full" />
          </a-form-item>
          <a-form-item label="Receiver">
            <a-input :value="oderDetailData?.phoneNumber" class="rounded-lg h-9 border-gray-300 w-full" />
          </a-form-item>
        </div>
        <a-form-item label="Address">
          <a-input :value="oderDetailData?.deliveryAddress" class="rounded-lg h-9 border-gray-300 w-full" />
        </a-form-item>
        <div class="grid grid-cols-2 gap-3">
          <a-form-item label="Order Date">
            <a-input :value="formatDate(oderDetailData?.orderDate!)" class="rounded-lg h-9 border-gray-300 w-full" />
            <!-- <a-date-picker v-model:value="value1" size="large" class="rounded-lg h-9 border-gray-300 w-full" /> -->
          </a-form-item>
          <a-form-item label="Order Time">
            <a-input :value="formatTime(oderDetailData?.orderDate!)" class="rounded-lg h-9 border-gray-300 w-full" />
          </a-form-item>
        </div>

      </a-form>
    </div>

    <div class="flex flex-col mt-6">
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-indigo-800 text-gray-100">
            <tr>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Id</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Name</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Color</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Origin Price</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Price</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Amount paid</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Quantity</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in oderDetailData?.productOrderDetails" :key="index"
              class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
              <td class="px-6 py-4 text-gray-700 border-b">{{ item.productId }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ item.productName }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ item.colorName }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ fomratVND(item.originPrice) }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ fomratVND(item.price) }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ fomratVND(oderDetailData?.amountPaid!) }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ item.quantity }}</td>
              <td class="px-6 py-4 border-b">
                <a-image :width="100" :height="80" :src="toImageLink(item.imageUrl)" alt="Brand Image"
                  class="rounded-md object-contain" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useTableData } from "../../hooks/orderData";
import httpService from "../../services/http.service";
import { Order_API } from "../../services/api_url";
import { fomratVND, formatDate, formatTime, toImageLink } from "../../services/common.service";
import dayjs, { Dayjs } from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const value1 = ref<Dayjs>(dayjs('2015-06-06', dateFormat));

interface Props {
  id: string;
}
const props = defineProps<Props>();

const { oderDetailData, setOrderDetailData } = useTableData();

async function getOrderDetail(id: number) {
  try {
    const res = await httpService.getWithAuth(Order_API + `/${id}`);
    setOrderDetailData(res);
    console.log(oderDetailData.value);

  } catch (error) {
    console.error("Error");
  }
}

onMounted(() => {
  const id = parseInt(props.id);
  getOrderDetail(id);
});
</script>
