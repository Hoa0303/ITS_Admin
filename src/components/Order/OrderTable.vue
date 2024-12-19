<template>
    <div class="flex flex-col">
        <div class="mt-3 flex justify-end">
            <div class="relative">
                <select v-model="pageSize" @change="updatePageSize"
                    class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
                    <option :value="1">1</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>

            <div class="relative block mt-2 sm:mt-0">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                    </svg>
                </span>
                <input v-model="searchQuery" placeholder="Search" @input="onSearchInput"
                    class="block w-full h-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
        </div>
    </div>

    <div class="my-6 overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
            <thead class="bg-indigo-800 text-gray-100">
                <tr>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Id</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Shipping Code</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Total</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Amount Paid</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Order Date</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Method</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Status</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in ordersData" :key="index"
                    class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.id }}</td>
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.shippingCode }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ item.total }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ item.amountPaid }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ formattedDayJs(item.orderDate) }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ item.paymentMethod }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b" :class="[statusStyles[item.orderStatus]]">
                        {{ OrderSatus[item.orderStatus] }}
                    </td>
                    <td class="px-6 py-4 text-gray-600 border-b" :class="[statusStyles[item.orderStatus]]">
                        <!-- <a-button class="m-2" v-if="(ActionStatus[item.orderStatus] && ActionStatus[item.orderStatus] != 'Delivery'
                            && ActionStatus[item.orderStatus] != 'Complete' && ActionStatus[item.orderStatus] != 'Receive')" @click="UpdateSatus(item.id)">
                            {{ ActionStatus[item.orderStatus] }}
                        </a-button> -->

                        <a-button class="m-2" v-if="(ActionStatus[item.orderStatus] && (ActionStatus[item.orderStatus] == 'Approve'
                            || ActionStatus[item.orderStatus] == 'Complete'))" @click="UpdateSatus(item.id)">
                            {{ ActionStatus[item.orderStatus] }}
                        </a-button>

                        <a-button class="m-2" v-if="(ActionStatus[item.orderStatus] == 'Delivery')" type="primary"
                            @click="openModal(item.id)">
                            {{ ActionStatus[item.orderStatus] }}
                        </a-button>

                        <!-- <a-statistic-countdown v-if="!item.reviewed && ActionStatus[item.orderStatus] == 'Complete'"
                            :value="deadline = getDeadline(item.orderDate)" format="HH:mm:ss:SSS"
                            style="margin-right: 50px" />

                        <a-button class="m-2" v-if="ActionStatus[item.orderStatus] &&
                            (item.reviewed || ActionStatus[item.orderStatus] == 'Complete')"
                            @click="UpdateSatus(item.id)">
                            {{ ActionStatus[item.orderStatus] }}
                        </a-button> -->

                        <!-- <a-statistic-countdown
                            v-if="!item.reviewed && ActionStatus[item.orderStatus] == 'Complete' && !isOrderExpired(item.orderDate)"
                            :value="getDeadline(item.orderDate)" format="HH:mm:ss:SSS" style="margin-right: 50px" /> -->

                        <a-button class="m-2" v-if="ActionStatus[item.orderStatus] == 'Receive'"
                            @click="receivedOrder(item.id)">
                            {{ ActionStatus[item.orderStatus] }}
                        </a-button>

                        <a-popconfirm title="Are you sure delete this order?" ok-text="Yes" cancel-text="No"
                            @confirm="cacelOrder(item.id)">
                            <a-button
                                v-if="OrderSatus[item.orderStatus] == 'Processing' || OrderSatus[item.orderStatus] == 'Confirmed'"
                                danger>
                                Cancel order
                            </a-button>
                        </a-popconfirm>
                    </td>
                    <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                        <router-link :to="{ name: 'order.detail', params: { id: item.id.toString() } }">
                            <button class="mr-2">
                                <svg width="20" height="20" fill="currentColor" class="bi bi-pencil-square">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex items-center justify-between px-5 py-4 bg-white border-t">
            <span class="text-sm text-gray-600">Showing {{ startItem }} to {{ endItem }} of {{ totalEntries
                }}
                Entries</span>
            <div class="flex items-center space-x-2">
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="px-3 py-0.5 flex items-center text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring">
                    <CaretLeftOutlined />
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-3 py-0.5 flex items-center text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring">
                    <CaretRightOutlined />
                </button>
            </div>
        </div>

    </div>

    <a-modal v-model:open="visible" title="Packaging information" ok-text="Create" cancel-text="Cancel" @ok="onOk">
        <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
            <div class="grid grid-cols-2 gap-3">
                <a-form-item label="Delivery request" name="request">
                    <a-select v-model:value="formState.request" placeholder="please select your request">
                        <a-select-option :value=0>Allow preview</a-select-option>
                        <a-select-option :value=1>Allow preview but no trial</a-select-option>
                        <a-select-option :value=2>No preview allowed</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item name="weight" label="Weight"
                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                    <a-input-number class="rounded-lg border-gray-300 w-full" :min="0" :max="50000"
                        v-model:value="formState.weight" :formatter="(value: any) => `${value} gram`"
                        :parser="(value: any) => value.replace(' gram', '')" />
                </a-form-item>
            </div>

            <div class="grid grid-cols-3 gap-3">
                <a-form-item name="height" label="Height"
                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                    <a-input-number class="rounded-lg border-gray-300 w-full" :min="0" :max="200"
                        v-model:value="formState.height" :formatter="(value: any) => `${value} cm`"
                        :parser="(value: any) => value.replace(' cm', '')" />
                </a-form-item>
                <a-form-item name="length" label="Length"
                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                    <a-input-number class="rounded-lg border-gray-300 w-full" :min="0" :max="200"
                        v-model:value="formState.length" :formatter="(value: any) => `${value} cm`"
                        :parser="(value: any) => value.replace(' cm', '')" />
                </a-form-item>
                <a-form-item name="width" label="Width"
                    :rules="[{ required: true, message: 'Please input the title of collection!' }]">
                    <a-input-number class="rounded-lg border-gray-300 w-full" :min="0" :max="200"
                        v-model:value="formState.width" :formatter="(value: any) => `${value} cm`"
                        :parser="(value: any) => value.replace(' cm', '')" />
                </a-form-item>
            </div>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { ActionStatus, OrderSatus, OrdersData, useTableData } from '../../hooks/orderData';
import orderService from '../../services/order.service';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import { message } from "ant-design-vue";
import httpService from '../../services/http.service';
import { Order_API } from '../../services/api_url';
import { formattedDayJs } from '../../services/common.service';

const props = defineProps<{ activeKey: number }>();

const { ordersData, setOrderData } = useTableData();


const statusStyles: { [key: number]: string } = {
    0: 'text-yellow-500',
    1: 'text-green-500',
    2: 'text-sky-500',
    3: 'text-purple-500',
    4: 'text-orange-500',
    5: 'text-red-500',
};

const pageSize = ref<number>(10);
const currentPage = ref<number>(1);
const totalEntries = ref<number>(0);
const totalPages = computed(() => Math.ceil(totalEntries.value / pageSize.value));
const startItem = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endItem = computed(() => Math.min(currentPage.value * pageSize.value, totalEntries.value));

const searchQuery = ref('');

async function getAll(page: number, size: number, searchQuery: string) {
    try {
        const res = await orderService.getAll(page, size, searchQuery);
        const formattedData = res.items.map((item: OrdersData) => ({
            id: item.id,
            shippingCode: item.shippingCode,
            total: item.total,
            amountPaid: item.amountPaid,
            orderDate: item.orderDate,
            reviewed: item.reviewed,
            paymentMethod: item.paymentMethod,
            orderStatus: item.orderStatus,
        }));
        setOrderData(formattedData);
        totalEntries.value = res.totalItems;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getOrderWithStatus(status: number, page: number, size: number, searchQuery: string) {
    try {
        const res = await httpService.getWithAuthPagination(Order_API + `/status/${status}`, page, size, searchQuery);
        const formattedData = res.items.map((item: OrdersData) => ({
            id: item.id,
            shippingCode: item.shippingCode,
            total: item.total,
            amountPaid: item.amountPaid,
            orderDate: item.orderDate,
            reviewed: item.reviewed,
            paymentMethod: item.paymentMethod,
            orderStatus: item.orderStatus,
        }));
        setOrderData(formattedData);
        totalEntries.value = res.totalItems;
    }
    catch (error) {
        console.log(error);
    }
}

async function UpdateSatus(orderId: number) {
    try {
        await message.loading('Updating status...', 2);
        await httpService.putWithAuth(Order_API + `/${orderId}`, orderId);
        const orderToUpdate = ordersData.value.find(order => order.id === orderId);
        if (orderToUpdate) {
            orderToUpdate.orderStatus += 1;
        }
        message.success("Update status successfully", 2);
    }
    catch {
        message.error("Fail to update order: ", orderId);
    }
}

async function cacelOrder(id: number) {
    try {
        await httpService.delWithAuth(Order_API + `/${id}`);
        const updatedOrders = ordersData.value.map(order => {
            if (order.id === id) {
                return { ...order, orderStatus: 5 };
            }
            return order;
        });
        setOrderData(updatedOrders);
        message.success('Order have been cancel')
    }
    catch {
        message.error('Fail to cancel to your order. Please try again!');
    }
}

async function receivedOrder(id: number) {
    try {
        await message.loading('Updating status...', 2);
        await httpService.putWithAuth(Order_API + `/received/${id}`, id);
        const updatedOrders = ordersData.value.map(order => {
            if (order.id === id) {
                return { ...order, orderStatus: 3 };
            }
            return order;
        });
        setOrderData(updatedOrders);
        message.success("Update status successfully", 2);
    }
    catch {
        message.error("Fail to update order: ", id);
    }
}

interface Values {
    request: number;
    weight: number;
    height: number;
    width: number;
    length: number;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const selectedId = ref();

const openModal = (id: any) => {
    visible.value = true;
    selectedId.value = id;
}

const formState = reactive<Values>({
    request: 0,
    weight: 1,
    height: 1,
    width: 1,
    length: 1,
});

const onOk = async () => {
    try {
        if (formRef.value) {
            const values = await formRef.value.validateFields()
            await httpService.putWithAuth(Order_API + `/shipping/${selectedId.value}`, values);

            const updatedOrder = ordersData.value.find(order => order.id === selectedId.value);
            if (updatedOrder) {
                updatedOrder.orderStatus += 1;
            }

            visible.value = false;
            selectedId.value = undefined;
            message.success("Successfully", 1);
        }
    }
    catch (error) {
        message.error('Failed', 1);
        console.log(error);
    }
};


function updatePageSize() {
    currentPage.value = 1;
    // getAll(currentPage.value, pageSize.value, searchQuery.value);
    const status = props.activeKey;
    if (status == 6) {
        getAll(currentPage.value, pageSize.value, searchQuery.value);
    }
    else {
        getOrderWithStatus(status, currentPage.value, pageSize.value, searchQuery.value);
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        // getAll(currentPage.value, pageSize.value, searchQuery.value);
        const status = props.activeKey;
        if (status == 6) {
            getAll(currentPage.value, pageSize.value, searchQuery.value);
        }
        else {
            getOrderWithStatus(status, currentPage.value, pageSize.value, searchQuery.value);
        }
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        // getAll(currentPage.value, pageSize.value, searchQuery.value);
        const status = props.activeKey;
        if (status == 6) {
            getAll(currentPage.value, pageSize.value, searchQuery.value);
        }
        else {
            getOrderWithStatus(status, currentPage.value, pageSize.value, searchQuery.value);
        }
    }
}

function onSearchInput() {
    currentPage.value = 1;
    // getAll(currentPage.value, pageSize.value, searchQuery.value);
    const status = props.activeKey;
    if (status == 6) {
        getAll(currentPage.value, pageSize.value, searchQuery.value);
    }
    else {
        getOrderWithStatus(status, currentPage.value, pageSize.value, searchQuery.value);
    }
}

//Hoàn thành đơn
// let deadline: number;

// function getDeadline(orderDate: string): number {
//     const orderDateObj = new Date(orderDate);
//     deadline = orderDateObj.getTime() + 3 * 24 * 60 * 60 * 1000;
//     return deadline;
// }

// function isOrderExpired(orderDate: string): boolean {
//     const currentTime = new Date().getTime();
//     const orderDeadline = getDeadline(orderDate);
//     return currentTime > orderDeadline;
// }

onMounted(() => {
    const status = props.activeKey;
    if (status == 6) {
        getAll(currentPage.value, pageSize.value, searchQuery.value);
    }
    else {
        getOrderWithStatus(status, currentPage.value, pageSize.value, searchQuery.value);
    }
});
</script>