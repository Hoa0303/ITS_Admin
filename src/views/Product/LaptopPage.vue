<template>
  <h3 class="text-gray-700 text-3xl font-medium">Laptop Page</h3>
  <div class="mt-6">
    <div class="flex flex-col mt-3 sm:flex-row  justify-between">
      <div class="flex">
        <div class="relative">
          <select v-model="pageSize" @change="updatePageSize"
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
            <option :value="2">2</option>
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

        <div class="relative">
          <select
            class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
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
        <a-button type="primary" size="large" class="flex items-center" @click="goToAddProduct">
          <PlusOutlined /> Add
        </a-button>
      </div>
    </div>

    <div class="flex flex-col mt-6">
      <div class="mt-6">
        <div class="my-6 overflow-x-auto bg-white rounded-lg shadow">
          <table class="w-full text-left border-collapse">
            <thead class="bg-indigo-800 text-gray-100">
              <tr>
                <th class="px-5 py-3 text-sm font-semibold uppercase">#</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Name</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Discount</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Category</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Brand</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Image</th>
                <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in productsData" :key="index"
                class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ index + 1 }}</td>
                <td class="px-6 py-4 text-gray-600 border-b">{{ item.name }}</td>
                <td class="px-6 py-4 text-gray-600 border-b">{{ item.discount }}</td>
                <td class="px-6 py-4 text-gray-600 border-b">{{ item.category }}</td>
                <td class="px-6 py-4 text-gray-600 border-b">{{ item.brand }}</td>
                <td class="px-6 py-4 border-b">
                  <a-image :width="100" :height="80" :src="item.imageUrl" alt="Brand Image"
                    class="rounded-md object-contain" />
                </td>
                <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                  <router-link :to="{ name: 'product.edit', params: { id: item.id.toString() } }">
                    <button class="mr-2">
                      <svg width="20" height="20" fill="currentColor" class="bi bi-pencil-square">
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </button>
                  </router-link>
                  <button class="text-red-600 hover:text-red-900">
                    <svg width="20" height="20" fill="currentColor" class="bi bi-trash3">
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-between px-5 py-4 bg-white border-t">
            <span class="text-sm text-gray-600">Showing {{ startItem }} to {{ endItem }} of {{ totalEntries }}
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useTableData } from "../../hooks/productData";
import productService from '../../services/product.service'
import { PlusOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { toImageLink } from "../../services/common.service";

const { productsData, setProductData } = useTableData();
const router = useRouter();

const pageSize = ref<number>(5);
const currentPage = ref<number>(1);
const totalEntries = ref<number>(0);
const data = ref([]);
const totalPages = computed(() => Math.ceil(totalEntries.value / pageSize.value));
const startItem = computed(() => (currentPage.value - 1) * pageSize.value + 1);
const endItem = computed(() => Math.min(currentPage.value * pageSize.value, totalEntries.value));

const searchQuery = ref('');

async function getAll(page: number, size: number, searchQuery: string) {
  const res = await productService.getAll(page, size, searchQuery);
  const formattedData = res.data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    discount: item.discount,
    category: item.categoryName,
    brand: item.brandName,
    imageUrl: toImageLink(item.imageUrl),
  }));
  setProductData(formattedData);
  totalEntries.value = res.data.totalItems;
  data.value = res.data;
}

function updatePageSize() {
  currentPage.value = 1;
  getAll(currentPage.value, pageSize.value, searchQuery.value);
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getAll(currentPage.value, pageSize.value, searchQuery.value);
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    getAll(currentPage.value, pageSize.value, searchQuery.value);
  }
}

function onSearchInput() {
  currentPage.value = 1;
  getAll(currentPage.value, pageSize.value, searchQuery.value);
}

function goToAddProduct() {
  router.push({ name: "Add product" });
}

onMounted(() => {
  getAll(currentPage.value, pageSize.value, searchQuery.value);
});

</script>