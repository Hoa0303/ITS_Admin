<template>
    <div class="col-span-2 my-6 overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
            <thead class="bg-indigo-800 text-gray-100">
                <tr>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">#</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Name</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Image</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Sold</th>
                    <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in productsData" :key="index"
                    class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                    <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ item.id }}</td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ item.name }}</td>
                    <td class="px-6 py-4 border-b">
                        <a-image :width="100" :height="80" :src="item.imageUrl" alt="Brand Image"
                            class="rounded-md object-contain" />
                    </td>
                    <td class="px-6 py-4 text-gray-600 border-b">{{ item.sold }}</td>
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
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { ProductsData, useTableData } from "../../hooks/productData";
import { toImageLink } from "../../services/common.service";
import httpService from "../../services/http.service";
import { Order_API } from "../../services/api_url";

const { productsData, setProductData } = useTableData();

async function getDescendingBySoldInCurrentMonth() {
    try {
        const res = await httpService.getWithAuthPagination(Order_API + '/descending-by-sold', 1, 5, '');
        const formattedData = res.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            sold: item.sold,
            imageUrl: toImageLink(item.imageUrl),
        }));
        setProductData(formattedData);
        // console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getDescendingBySoldInCurrentMonth();
})

</script>