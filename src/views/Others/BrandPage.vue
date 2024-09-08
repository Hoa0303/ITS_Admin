<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">Brands Page</h3>
    <div class="mt-6 grid grid-cols-3 gap-4">
      <div class="col-span-2 my-6 overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-indigo-800 text-gray-100">
            <tr>
              <th class="px-5 py-3 text-sm font-semibold uppercase">#</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Name</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Image</th>
              <th class="px-5 py-3 text-sm font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in brandsData" :key="index"
              class="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
              <td class="px-6 py-4 text-lg text-gray-700 border-b">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-gray-600 border-b">{{ item.name }}</td>
              <td class="px-6 py-4 border-b">
                <a-image :width="100" :height="80" :src="item.image" alt="Brand Image"
                  class="rounded-md object-contain" />
              </td>
              <td class="px-6 py-4 text-indigo-600 border-b cursor-pointer hover:text-indigo-900">
                <button @click="editBrand(item)" class="mr-2">
                  <svg width="20" height="20" fill="currentColor" class="bi bi-pencil-square">
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </button>
                <button @click="confirmDelete(item.id)" class="text-red-600 hover:text-red-900">
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
          <span class="text-sm text-gray-600">Showing 1 to 4 of 50 Entries</span>
          <div class="flex items-center space-x-2">
            <button
              class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring">
              <!-- <i class="fas fa-arrow-left"></i> -->
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring">
              <!-- <i class="fas fa-arrow-right"></i> -->
            </button>
          </div>
        </div>
      </div>

      <div class="my-6 bg-white rounded-lg shadow h-fit">
        <form>
          <div class="flex items-center justify-between px-5 py-3 border-b bg-indigo-800 text-gray-100 rounded-t-lg">
            <h3 class="text-sm font-medium">Edit Brand</h3>
          </div>

          <div class="px-5 pb-6 text-gray-700 bg-gray-200 border-b">
            <label class="text-md font-medium">Name</label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input type="text" v-model="selectedBrand.name"
                class="w-full px-4 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
            </div>
          </div>

          <div class="px-5 pb-6 text-gray-700 bg-gray-200 border-b">
            <label class="text-md font-medium">Image</label>
            <div class="mt-2 rounded-md shadow-sm">
              <input type="file" @change="handleFileChange" accept="image/*" />
              <div v-if="selectedBrand.image" class="mt-4">
                <a-image :width="100" :height="80" :src="selectedBrand.image" alt="Brand Image"
                  class="rounded-md object-contain" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between px-5 py-3">
            <button @click="cancelEdit"
              class="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
              Cancel
            </button>
            <button @click="saveBrand" type="submit"
              class="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useTableData } from "../../hooks/dataTable";
import brandService from "../../services/brand.service";
import { toImageLink } from "../../services/common.service";

export default defineComponent({
  setup() {
    const { brandsData, setBrandsData } = useTableData();
    const selectedBrand = ref({ id: '', name: '', image: '', imageFile: null as File | null });

    async function getAll() {
      try {
        const res = await brandService.getAllBrands();
        const formattedData = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: toImageLink(item.imgUrl),
        }));
        setBrandsData(formattedData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

    function editBrand(brand: any) {
      selectedBrand.value = { ...brand };

    }

    function cancelEdit() {
      selectedBrand.value = { id: '', name: '', image: '', imageFile: null };
    }

    function confirmDelete(id: string) {
      if (confirm("Are you sure you want to delete this brand?")) {
        deleteBrand(id);
      }
    }

    async function deleteBrand(id: string) {
      try {
        console.log("Delete brand: " + id);
        await brandService.remove(id);
        getAll();
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }

    async function saveBrand() {
      try {
        const data = new FormData();
        data.append('name', selectedBrand.value.name);
        if (selectedBrand.value.imageFile) {
          data.append('files', selectedBrand.value.imageFile)
        }
        if (selectedBrand.value.id) {
          // Nếu tồn tại ID => update brands
          if (selectedBrand.value.imageFile) {
            data.append('files', selectedBrand.value.imageFile)
          } else {
            data.append('files', selectedBrand.value.image)
          }
          console.log(data.get('name'), data.get('files'));
          const res = await brandService.update(selectedBrand.value.id, data);
          console.log(res);
        } else {
          // Thêm brands mới
          // console.log(data.get('name'), data.get('files'));
          const res = await brandService.create(data);
          console.log(res);
        }
        getAll();
        // cancelEdit();
      } catch (error) {
        console.error("Error saving brand:", error);
      }
    }

    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        selectedBrand.value.imageFile = file
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedBrand.value.image = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

    onMounted(() => {
      getAll();
    });

    return { brandsData, selectedBrand, editBrand, cancelEdit, confirmDelete, saveBrand, handleFileChange };
  },
});
</script>
