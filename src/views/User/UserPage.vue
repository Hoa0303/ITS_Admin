<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Users Page</h3>
    <div class="mt-6">

      <div class="flex flex-col mt-3 sm:flex-row">
        <div class="flex">
          <div class="relative">
            <select
              class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
              <option>5</option>
              <option>10</option>
              <option>20</option>
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
        </div>

        <div class="relative block mt-2 sm:mt-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-gray-500 fill-current">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
            </svg>
          </span>

          <input placeholder="Search"
            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
        </div>
      </div>

      <div class="flex flex-col mt-6">
        <div class="mt-6">
          <div class="my-6 overflow-x-auto bg-white rounded-lg shadow">
            <table class="w-full text-left border-collapse">
              <thead class="bg-indigo-800 text-gray-100">
                <tr>
                  <th class="px-5 py-3 text-sm font-semibold uppercase">#</th>
                  <th class="px-5 py-3 text-sm font-semibold uppercase">Infor</th>
                  <th class="px-5 py-3 text-sm font-semibold uppercase">Phone Number</th>
                  <th class="px-5 py-3 text-sm font-semibold uppercase">Create At</th>
                  <!-- <th class="px-5 py-3 text-sm font-semibold uppercase">Update At</th>
                  <th class="px-5 py-3 text-sm font-semibold uppercase">Active</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in usersData" :key="index"
                  class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                  <td class="px-6 py-4 text-gray-700 border-b">{{ index + 1 }}</td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-10 h-10 rounded-full" src="/user.jpg" alt="profile pic" />
                      </div>

                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-gray-900">
                          {{ user.fullName }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          {{ user.email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-600 border-b">{{ user.phoneNumber }}</td>
                  <td class="px-6 py-4 text-gray-600 border-b">
                    {{ formatDate(user.createAt) }}
                    {{ formatTime(user.createAt) }}
                  </td>
                  <!-- <td class="px-6 py-4 text-gray-600 border-b">{{ user.updateAt }}</td>
                  <td class="px-6 py-4 text-gray-600 border-b">
                    <a-switch v-model:checked="enable" />
                  </td> -->
                </tr>
              </tbody>
            </table>
            <!-- <div class="flex items-center justify-between px-5 py-4 bg-white border-t">
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
            </div> -->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { User_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { useTableData } from '../../hooks/userData';
import { formatDate, formatTime } from '../../services/common.service';

const { usersData, setUserData } = useTableData();
const enable = ref(true);

async function getAllUser() {
  try {
    const res = await httpService.getWithAuth(User_API);
    const formattedData = res.items.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      createAt: item.createAt,
      updateAt: item.updateAt,
    }));
    setUserData(formattedData);
    console.log(usersData.value);
  }
  catch {
    console.log("Error");
  }
}

onMounted(() => {
  getAllUser();
})

</script>
