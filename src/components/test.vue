<template>
    <h3 class="text-gray-700 text-3xl font-medium">Test Page</h3>

    <!-- <div class="mt-6">
        <div class="flex flex-col mt-3 sm:flex-row  justify-between">
            <div class="flex">
                <div class="relative">
                    <select v-model="pageSize" @change="updatePageSize"
                        class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
                        <option :value="5">5</option>
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

            <div class="relative block mt-2 sm:mt-0">
                <a-button type="primary" size="large" class="flex items-center" @click="visible = true">
                    <PlusOutlined /> Add
                </a-button>
            </div>
        </div>

        <div>
            <a-modal v-model:open="visible" :centered="true" style="margin: 1rem 0;"
                title="Create a new warehouse receipt" :closable="false" :maskClosable="false" :footer="null">
                <FormAdd @cancel="handleCancel" @create="handleCreate" />
            </a-modal>
        </div>

        <div class="flex flex-col mt-6">
            <div class="mt-6">
                <div class="my-6 overflow-x-auto bg-white rounded-lg shadow">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-indigo-800 text-gray-100">
                            <tr>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Id</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Creator</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Note</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Receipt Creation Date</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Receipt Entry Date</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Total</th>
                                <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in warehousesData" :key="index"
                                class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                                <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.id }}</td>
                                <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.creator }}</td>
                                <td class="px-6 py-4 text-gray-600 border-b">{{ item.note }}</td>
                                <td class="px-6 py-4 text-gray-600 border-b">
                                    {{ formatDate(item.createAt) }} {{ formatTime(item.createAt) }}
                                </td>
                                <td class="px-6 py-4 text-gray-600 border-b">
                                    {{ formatDate(item.entryDate) }} {{ formatTime(item.entryDate) }}
                                </td>
                                <td class="px-6 py-4 text-gray-600 border-b">{{ item.total }}</td>
                                <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                                    <button class="mr-2" @click="showDrawer(item)">
                                        <svg width="20" height="20" fill="currentColor" class="bi bi-pencil-square">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
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
            </div>
        </div>

        <div>
            <a-modal v-model:open="modelDetail" :centered="true" style="margin: 1rem 0;" title="Receipt Detail"
                :closable="false" :footer="null">
                <FormEdit :id="ID" :receipt="Receipt" @close="handleClose" @save="handleSave" />
            </a-modal>
        </div>

    </div> -->
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import FormAdd from './Warehouse/FormAdd.vue';
import FormEdit from './Warehouse/FormEdit.vue';
import dayjs, { Dayjs } from 'dayjs';
import { PlusOutlined, CaretRightOutlined, CaretLeftOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import { NameData, WarehouseData, useTableData } from '../hooks/warehouseData';
import { Product_API, Receipt_API } from '../services/api_url';
import httpService from '../services/http.service';
import { FormInstance, message } from 'ant-design-vue';
import { fomratVND, formatDate, formattedDayJs, formatTime } from '../services/common.service';


//Show modal
const visible = ref(false);
const modelDetail = ref(false);


//Form create
interface Values {
    createDate: Dayjs;
    entryDate: Dayjs;
    note: string;
    items: {
        productId?: number,
        colorId?: number,
        quantity: number,
        costPrice: number,
    }[];
}
const formRef = ref<FormInstance>();
const formState = reactive<Values>({
    createDate: dayjs(),
    entryDate: dayjs(),
    note: '',
    items: [{
        productId: undefined,
        colorId: undefined,
        quantity: 0,
        costPrice: 0,
    }]
});

const productOptions = ref([]);
const colorOptions = ref([]);

const total = computed(() => {
    return formState.items.reduce((acc, item) => {
        return acc + (item.quantity * item.costPrice);
    }, 0);
});

const addItem = () => {
    formState.items.push({
        productId: undefined,
        colorId: undefined,
        quantity: 0,
        costPrice: 0
    });
};

const removeItem = (index: number) => {
    if (formState.items.length > 1) {
        formState.items.splice(index, 1);
    }
};

//Drawer
const ID = ref();
const Receipt = ref()

const showDrawer = (item: WarehouseData) => {
    modelDetail.value = true;
    Receipt.value = item;
    ID.value = item.id
};

//Pagination
const pageSize = ref<number>(5);
const currentPage = ref<number>(1);
const totalEntries = ref<number>(0);
const totalPages = computed(() => Math.ceil(totalEntries.value / pageSize.value));
const startItem = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endItem = computed(() => Math.min(currentPage.value * pageSize.value, totalEntries.value));
const searchQuery = ref('');

function updatePageSize() {
    currentPage.value = 1;
    getAllReceipt(currentPage.value, pageSize.value, searchQuery.value);
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        getAllReceipt(currentPage.value, pageSize.value, searchQuery.value);
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        getAllReceipt(currentPage.value, pageSize.value, searchQuery.value);
    }
}

function onSearchInput() {
    currentPage.value = 1;
    getAllReceipt(currentPage.value, pageSize.value, searchQuery.value);
}

//Call API
const { warehousesData, setWarehouseData } = useTableData();

async function getAllReceipt(page: number, size: number, searchQuery: string) {
    try {
        const res = await httpService.getWithAuthPagination(Receipt_API, page, size, searchQuery);
        const formattedData = res.items.map((item: WarehouseData) => ({
            id: item.id,
            creator: item.creator,
            note: item.note,
            total: item.total,
            entryDate: item.entryDate,
            createAt: item.createAt
        }));
        setWarehouseData(formattedData)
        totalEntries.value = res.totalItems;
    }
    catch (error) {
        console.log(error);
    }
}


const handleCancel = () => {
    visible.value = false;
};

const handleCreate = () => {
    visible.value = false;
};

const handleClose = () => {
    modelDetail.value = false;
};

const handleSave = () => {
    modelDetail.value = false;
};

onMounted(() => {
    getAllReceipt(currentPage.value, pageSize.value, searchQuery.value);
})
</script>