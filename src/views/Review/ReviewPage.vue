<template>
    <h3 class="text-gray-700 text-3xl font-medium">Reviews Page</h3>

    <div class="grid grid-cols-4 gap-3 mt-4">
        <a-select size="large" class="col-span-2" v-model:value="selectedId" :options="productOptions"
            placeholder="Select Product" @change="onProductChange(selectedId)" showSearch optionFilterProp="label" />
    </div>

    <div class="flex flex-col mt-6">
        <div class="mt-6">
            <div class="my-6 overflow-x-auto bg-white rounded-lg shadow">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-indigo-800 text-gray-100">
                        <tr>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">Id</th>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">User</th>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">Description</th>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">Star</th>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">Review Date</th>
                            <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in reviewData" :key="index"
                            class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                            <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ index + 1 }}</td>
                            <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.fullName }}</td>
                            <td class="px-6 py-4 text-gray-600 border-b">{{ item.description }}</td>
                            <td class="px-6 py-4 text-lg text-gray-700 border-b">
                                <a-rate v-model:value="item.start" allow-half disabled />
                            </td>
                            <td class="px-6 py-4 text-gray-600 border-b">
                                {{ formatDate(item.createAt) }} {{ formatTime(item.createAt) }}
                            </td>
                            <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                                <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No"
                                    @confirm="deleteReview(item.id)">
                                    <button class="text-red-600 hover:text-red-900">
                                        <svg width="20" height="20" fill="currentColor" class="bi bi-trash3">
                                            <path
                                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </button>
                                </a-popconfirm>
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

</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { ReviewTableData, useTableData } from '../../hooks/dataTable';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons-vue';
import { Product_API, Review_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { formatDate, formatTime } from '../../services/common.service';
import { NameData } from '../../hooks/warehouseData';
import { watch } from 'vue';
import { message } from 'ant-design-vue';

//Pagination
const pageSize = ref<number>(5);
const currentPage = ref<number>(1);
const totalEntries = ref<number>(0);
const totalPages = computed(() => Math.ceil(totalEntries.value / pageSize.value));
const startItem = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endItem = computed(() => Math.min(currentPage.value * pageSize.value, totalEntries.value));
const searchQuery = ref('');

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        getReview(selectedId.value, currentPage.value, pageSize.value, searchQuery.value);
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        getReview(selectedId.value, currentPage.value, pageSize.value, searchQuery.value);
    }
}

//Get Product options
const productOptions = ref([]);
const selectedId = ref(1);

async function getProduct() {
    try {
        const res = await httpService.getWithAuth(Product_API + '/name');
        productOptions.value = res.map((item: NameData) => ({
            value: item.id,
            label: item.name
        }));
    }
    catch (error) {
        console.log(error);
    }
}

const onProductChange = (id: number) => {
    selectedId.value = id;
};

// Get product's Review
const { reviewData, setReviewData } = useTableData();

async function getReview(id: number, page: number, size: number, searchQuery: string) {
    try {
        const res = await httpService.getWithAuthPagination(Product_API + `/review/${id}`, page, size, searchQuery);
        totalEntries.value = res.totalItems;
        const formatData = res.items.map((item: ReviewTableData) => ({
            id: item.id,
            description: item.description,
            start: item.start,
            fullName: item.fullName,
            createAt: item.createAt,
        }))
        setReviewData(formatData);
    }
    catch (error) {
        console.log(error);
    }
}

// Delete Review
async function deleteReview(id: string) {
    try {
        await message.loading('Delete review...', 2);
        await httpService.delWithAuth(Review_API + `/${id}`)
        setReviewData(reviewData.value.filter(review => review.id !== id));
        message.success('Review deleted successfully', 2)
    } catch (error) {
        message.error("Error deleting review:", 2);
    }
}

watch(selectedId, () => {
    getReview(selectedId.value, currentPage.value, pageSize.value, searchQuery.value)
});

onMounted(() => {
    getReview(selectedId.value, currentPage.value, pageSize.value, searchQuery.value);
    getProduct();
})
</script>