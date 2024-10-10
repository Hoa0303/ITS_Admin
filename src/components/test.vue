<!-- <template>
  <a-form :model="formState" @finish="onFinish" layout="vertical">
      <div class="grid lg:grid-cols-2 md:grid-cols-1 bg-white rounded-lg">
          <div style="padding: 30px">
              <a-card class="h-full" :bordered="true">
                  <a-form-item label="Name" name="name"
                      :rules="[{ required: true, message: 'Please enter the product name' }]">
                      <a-input v-model:value="formState.name" class="rounded-lg h-9 border-gray-300 w-full"
                          placeholder="Enter your product's name" />
                  </a-form-item>

                  <div class="grid grid-cols-2 gap-3">
                      <a-form-item label="Category" name="category"
                          :rules="[{ required: true, message: 'Please select a category' }]">
                          <a-select v-model:value="formState.category" placeholder="Select category">
                              <a-select-option v-for="item in categoriesData" :key="item.id" :value="item.id">
                                  {{ item.name }}
                              </a-select-option>
                          </a-select>
                      </a-form-item>


                      <a-form-item label="Brand" name="brand"
                          :rules="[{ required: true, message: 'Please select a brand' }]">
                          <a-select v-model:value="formState.brand" placeholder="Select brand">
                              <a-select-option v-for="item in brandsData" :key="item.id" :value="item.id">
                                  {{ item.name }}
                              </a-select-option>
                          </a-select>
                      </a-form-item>
                  </div>

                  <div class="grid grid-cols-3 gap-3">
                      <a-form-item label="Prices" name="prices"
                          :rules="[{ required: true, message: 'Please enter the price' }]">
                          <a-input v-model:value="formState.prices" type="number"
                              class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Discount" name="discount"
                          :rules="[{ required: true, message: 'Please enter the discount' }]">
                          <a-input v-model:value="formState.discount" type="number"
                              class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Quantity" name="quantity"
                          :rules="[{ required: true, message: 'Please enter the quantity' }]">
                          <a-input v-model:value="formState.quantity" type="number"
                              class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>
                  </div>

                  <div class="grid grid-cols-2 gap-3" v-for="(color, index) in dynamicValidateForm.colors"
                      :key="color.id">
                      <a-form-item v-model:value="color.colorID" label="Select" name="colorSelect">
                          <a-select v-model:value="color.colorID">
                              <a-select-option v-for="item in colorData" :key="item.id" :value="item.id">
                                  {{ item.name }}
                              </a-select-option>
                          </a-select>
                      </a-form-item>

                      <div class="grid grid-cols-2 gap-3">
                          <a-form-item label="Upload">
                              <a-upload v-model:value="color.file" name="file" list-type="picture" :max-count="1"
                                  :before-upload="beforeUpload">
                                  <a-button class="flex items-center">
                                      <UploadOutlined />
                                      Click to upload
                                  </a-button>
                              </a-upload>
                          </a-form-item>

                          <a-form-item label=" ">
                              <a-button class="ms-5 flex items-center" @click="removeColor(color)">
                                  Remove
                              </a-button>
                          </a-form-item>
                      </div>
                  </div>

                  <a-form-item>
                      <a-button type="dashed" class="flex items-center" @click="addColor">
                          <PlusOutlined />
                          Add color
                      </a-button>
                  </a-form-item>

              </a-card>
          </div>

          <div style="padding: 30px">
              <a-card :bordered="true">
                  <div class="grid grid-cols-3 gap-3">
                      <a-form-item label="Screen" name="SizeScreen"
                          :rules="[{ required: true, message: 'Please enter the screen details' }]">
                          <a-input v-model:value="formState.SizeScreen"
                              class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Scan" name="scanhz"
                          :rules="[{ required: true, message: 'Please enter the scan details' }]">
                          <a-input v-model:value="formState.scanhz" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Material" name="material"
                          :rules="[{ required: true, message: 'Please enter the material' }]">
                          <a-input v-model:value="formState.material" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                      <a-form-item label="Rear Camera" name="RearCam"
                          :rules="[{ required: true, message: 'Please enter the rear camera details' }]">
                          <a-input v-model:value="formState.RearCam" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Front Camera" name="FrontCam"
                          :rules="[{ required: true, message: 'Please enter the front camera details' }]">
                          <a-input v-model:value="formState.FrontCam" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>
                  </div>

                  <div class="grid grid-cols-3 gap-3">
                      <a-form-item label="CPU" name="Cpu"
                          :rules="[{ required: true, message: 'Please enter the CPU details' }]">
                          <a-input v-model:value="formState.Cpu" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Ram" name="Ram"
                          :rules="[{ required: true, message: 'Please enter the RAM details' }]">
                          <a-input v-model:value="formState.Ram" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Rom" name="rom"
                          :rules="[{ required: true, message: 'Please enter the ROM details' }]">
                          <a-input v-model:value="formState.rom" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>
                  </div>

                  <div class="grid grid-cols-3 gap-3">
                      <a-form-item label="Battery" name="Battery"
                          :rules="[{ required: true, message: 'Please enter the battery details' }]">
                          <a-input v-model:value="formState.Battery" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Size" name="size"
                          :rules="[{ required: true, message: 'Please enter the size details' }]">
                          <a-input v-model:value="formState.size" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>

                      <a-form-item label="Weight" name="weight"
                          :rules="[{ required: true, message: 'Please enter the weight' }]">
                          <a-input v-model:value="formState.weight" class="rounded-lg h-9 border-gray-300 w-full" />
                      </a-form-item>
                  </div>

                  <a-form-item label="Uplpad">
                      <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                          class="avatar-uploader" :before-upload="beforeUpload">
                          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                          <div v-else>
                              <loading-outlined v-if="loading"></loading-outlined>
                              <plus-outlined v-else></plus-outlined>
                              <div class="ant-upload-text">Upload</div>
                          </div>
                      </a-upload>
                  </a-form-item>

                  <a-form-item>
                      <a-button type="primary" html-type="submit">Create</a-button>
                      <a-button style="margin-left: 10px">Reset</a-button>
                  </a-form-item>
              </a-card>
          </div>
      </div>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import { PlusOutlined, UploadOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { useTableData } from "../../hooks/dataTable";
import productService from '../../services/product.service';

const { categoriesData, setcategoriesData } = useTableData();
const { brandsData, setBrandsData } = useTableData();
const { colorData, setColorData } = useTableData();

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const beforeUpload = () => {
  return false;
};

interface FormData {
  name: string,
  category: number,
  brand: number,
  prices: number,
  discount: number,
  quantity: number,
  SizeScreen: number,
  scanhz: string,
  material: string,
  RearCam: string,
  FrontCam: string,
  Cpu: string,
  Ram: number,
  rom: number,
  Battery: number,
  size: string,
  weight: number,
}

const formState = reactive<FormData>({
  name: '',
  category: 1,
  brand: 1,
  prices: 0,
  discount: 0,
  quantity: 0,
  SizeScreen: 0,
  scanhz: '',
  material: '',
  RearCam: '',
  FrontCam: '',
  Cpu: '',
  Ram: 0,
  rom: 0,
  Battery: 0,
  size: '',
  weight: 0,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  console.log('Submitted files:', fileList.value);
  console.log('Color:', dynamicValidateForm.colors);

};

async function getAttribute() {
  const res = await productService.fetchProductAttributes();
  setcategoriesData(res.categories);
  setBrandsData(res.brands);
  setColorData(res.color);
}

interface Color {
  colorID: number;
  file: File | null;
  id: number;
}

const dynamicValidateForm = reactive<{ colors: Color[] }>({
  colors: [],
});

const removeColor = (item: Color) => {
  const index = dynamicValidateForm.colors.indexOf(item);
  dynamicValidateForm.colors.splice(index, 1);
};

const addColor = () => {
  // console.log(dynamicValidateForm);
  dynamicValidateForm.colors.push({
      colorID: 1,
      file: null,
      id: dynamicValidateForm.colors.length,
  });
};

onMounted(() => {
  getAttribute();
});
</script> -->