<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Users Page</h3>
    <div class="mt-6">

      <!-- Header -->
      <div class="flex flex-col mt-3 sm:flex-row justify-between">
        <div class="flex">
          <div class="relative">
            <select v-model="pageSize" @change="updatePageSize"
              class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
              <option :value="1">1</option>
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
            <select v-model="selectedRole" @change="updateSelect"
              class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
              <!-- <option :value="0">Admin</option> -->
              <option :value="1">Employee</option>
              <option :value="2">Stocker</option>
              <option :value="3">Statist</option>
              <option :value="4">User</option>
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
          <a-button type="primary" size="large" class="flex items-center" @click="openAddModal">
            <PlusOutlined /> Add
          </a-button>
        </div>

      </div>

      <!-- Modal -->
      <div>
        <a-modal v-model:open="visible" :centered="true" title="Create a new user" :closable="false"
          :maskClosable="false" :footer="null">
          <FormAdd :id="userId" @cancel="handleCancel" @create="handleCreate" />
        </a-modal>
      </div>

      <!-- <a-modal v-model:open="lockModal" title="Lock User" ok-text="Confirm" cancel-text="Cancel" @ok="onLock(userId)">
        <a-form layout="vertical">
          <a-form-item>
            <a-radio-group v-model:value="selectedOption">
              <a-radio value="fixedDate">Lock for 1 day</a-radio>
              <a-radio value="anyDate">Lock until a specific date</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-if="selectedOption === 'anyDate'" label="Specific Date">
            <a-date-picker v-model:value="anyDate" placeholder="Select a specific date"
              :disabled-date="disablePastDates" />
          </a-form-item>
        </a-form>
      </a-modal> -->

      <!-- Table -->
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
                  <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
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
                  <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                    <button class="mr-2" @click="selectUser(user.id)">
                      <svg width="20" height="20" fill="currentColor" class="bi bi-pencil-square">
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </button>
                    <button v-if="user.lockedOut" class="text-red-600 hover:text-red-900" @click="unLock(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor"
                        class="bi bi-lock-fill">
                        <path
                          d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                      </svg>
                    </button>
                    <button v-else class="text-red-600 hover:text-red-900" @click="onLock(user.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                        class="bi bi-unlock-fill">
                        <path
                          d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2" />
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
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { CaretRightOutlined, CaretLeftOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { User_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { Role, useTableData } from '../../hooks/userData';
import { formatDate, formatTime } from '../../services/common.service';
import dayjs, { Dayjs } from 'dayjs';

import FormAdd from '../../components/User/FormAdd.vue';

const { usersData, setUserData } = useTableData();
// const selectedOption = ref<string>('fixedDate');
const fixedDate = ref<Dayjs | null>(null);
// const anyDate = ref<Dayjs | null>(null);

function updateSelect() {
  getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
}

const calculateFixedDate = () => {
  return dayjs().add(1, 'year');
};

// const disablePastDates = (current: Date) => {
//   return current && dayjs(current).isBefore(dayjs(), 'day');
// };

const selectedRole = ref<Role>(Role.User);

//Modal
const visible = ref(false);
const handleCancel = () => {
  visible.value = false;
};

// const lockModal = ref(false);
// const closeModal = () => {
//   lockModal.value = false;
// }

const handleCreate = async () => {
  getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value)
  visible.value = false;
};


const userId = ref();
const openAddModal = () => {
  userId.value = null;
  visible.value = true;
};
const selectUser = (id: string) => {
  userId.value = id;
  visible.value = true;
}
// const lockUser = (id: string) => {
//   userId.value = id;
//   lockModal.value = true;
// }


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
  getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
  }
}

function onSearchInput() {
  currentPage.value = 1;
  getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
}

async function getAllUser(page: number, size: number, searchQuery: string, role: number) {
  try {
    const res = await httpService.getUser(User_API, page, size, searchQuery, role);
    totalEntries.value = res.totalItems;

    const formattedData = res.items.map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      lockedOut: item.lockedOut,
      createAt: item.createAt,
      updateAt: item.updateAt,
    }));
    setUserData(formattedData);
    // console.log(usersData.value);
  }
  catch {
    console.log("Error");
  }
}

async function onLock(id: string) {
  try {
    // const data = {
    //   endDate: ''
    // };

    // if (selectedOption.value === 'fixedDate' && fixedDate.value) {
    //   data.endDate = fixedDate.value?.format();
    // } else if (selectedOption.value === 'anyDate' && anyDate.value) {
    //   data.endDate = anyDate.value?.format();
    // }
    const data = {
      endDate: fixedDate.value?.format()
    };

    console.log('Lock Data:', data);

    await httpService.putWithAuth(User_API + `/lock-out/${id}`, data);

    const updatedData = usersData.value.map((user) => {
      if (user.id === id) {
        return { ...user, lockedOut: true };
      }
      return user;
    });
    setUserData(updatedData);

    // closeModal();
  } catch (error) {
    console.error('Error locking user:', error);
  }
}

async function unLock(id: string) {
  try {
    const data = {
      endDate: null
    }
    await httpService.putWithAuth(User_API + `/lock-out/${id}`, data);
    const updatedData = usersData.value.map((user) => {
      if (user.id === id) {
        return { ...user, lockedOut: false };
      }
      return user;
    });
    setUserData(updatedData);
  }
  catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllUser(currentPage.value, pageSize.value, searchQuery.value, selectedRole.value);
  fixedDate.value = calculateFixedDate();
});
</script>