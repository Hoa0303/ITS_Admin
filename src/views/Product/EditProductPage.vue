<template>
    <a-form :model="formState" @finish="onFinish" layout="vertical">
        <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-4 rounded-lg">
            <div class="shadow-lg">
                <a-card class="h-full" :bordered="true">

                    <a-form-item label="Name" name="name"
                        :rules="[{ required: true, message: 'Please enter the product name' }]">
                        <a-input v-model:value="formState.name" class="rounded-lg h-9 border-gray-300 w-full"
                            placeholder="Enter your product's name" />
                    </a-form-item>

                    <!-- Category -->
                    <div class="grid grid-cols-3 gap-3">
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

                        <a-form-item label="Discount" name="discount"
                            :rules="[{ required: true, message: 'Please enter the discount' }]">
                            <a-input v-model:value="formState.discount" type="number"
                                class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>
                    </div>

                    <!-- Add color + img_Color -->
                    <a-card :bordered="true" class="my-4 shadow-xl" v-for="(color) in dynamicValidateForm.colors"
                        :key="color.id">
                        <div class="grid grid-cols-3 gap-3">
                            <a-form-item label="Prices"
                                :rules="[{ required: true, message: 'Please enter the price' }]">
                                <a-input v-model:value="color.prices" type="number"
                                    class="rounded-lg h-9 border-gray-300 w-full" />
                            </a-form-item>

                            <a-form-item label="Quantity"
                                :rules="[{ required: true, message: 'Please enter the quantity' }]">
                                <a-input v-model:value="color.quantity" type="number"
                                    class="rounded-lg h-9 border-gray-300 w-full" />
                            </a-form-item>
                            <a-form-item label="Select Color">
                                <a-select v-model:value="color.colorID">
                                    <a-select-option v-for="item in colorData" :key="item.id" :value="item.id">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                        <div class="flex items-center space-x-4">
                            <a-form-item label="Upload" class="flex-1">
                                <a-upload :file-list="color.file ? [color.file] : []" name="file" :max-count="1"
                                    :before-upload="beforeUpload" @change="handleColorFileChange(color, $event)">
                                    <a-button v-if="!color.file" class="flex items-center">
                                        <UploadOutlined />
                                        Click to upload
                                    </a-button>
                                </a-upload>
                            </a-form-item>
                            <MinusCircleOutlined class="text-red-500 cursor-pointer" @click="removeColor(color)" />
                        </div>
                    </a-card>
                    <a-form-item>
                        <a-button type="dashed" class="flex items-center" @click="addColor">
                            <PlusOutlined />
                            Add color
                        </a-button>
                    </a-form-item>

                </a-card>
            </div>

            <div class="shadow-lg">
                <a-card class="h-full" :bordered="true">
                    <!-- Screen -->
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

                        <a-form-item label="Display panel" name="material"
                            :rules="[{ required: true, message: 'Please enter the material' }]">
                            <a-input v-model:value="formState.material" class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>
                    </div>

                    <!-- Camera -->
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

                    <!-- CPU-GPU -->
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item label="CPU" name="Cpu"
                            :rules="[{ required: true, message: 'Please enter the CPU details' }]">
                            <a-input v-model:value="formState.Cpu" class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>

                        <a-form-item label="GPU" name="Gpu"
                            :rules="[{ required: true, message: 'Please enter the CPU details' }]">
                            <a-input v-model:value="formState.Gpu" class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>
                    </div>

                    <!-- Ram-Rom -->
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item label="Ram" name="Ram"
                            :rules="[{ required: true, message: 'Please enter the RAM details' }]">
                            <a-select v-model:value="formState.Ram" size="large"
                                class="rounded-lg h-9 border-gray-300 w-full">
                                <a-select-option v-for="ram in [4, 6, 8, 16, 32, 64]" :key="ram" :value="ram">{{ ram
                                    }}</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item label="Rom" name="rom"
                            :rules="[{ required: true, message: 'Please enter the ROM details' }]">
                            <a-select v-model:value="formState.rom" size="large"
                                class="rounded-lg h-9 border-gray-300 w-full">
                                <a-select-option v-for="rom in [64, 128, 256, 512, 1]" :key="rom" :value="rom">{{
                                    rom }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>

                    <!-- Battery -->
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

                    <!-- Version -->
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item label="Version" name="version"
                            :rules="[{ required: true, message: 'Please enter the version' }]">
                            <a-input v-model:value="formState.version" class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>
                        <a-form-item label="Line" name="line"
                            :rules="[{ required: true, message: 'Please enter the line' }]">
                            <a-input v-model:value="formState.line" class="rounded-lg h-9 border-gray-300 w-full" />
                        </a-form-item>
                    </div>

                    <!-- Upload -->
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

                    <!-- Button -->
                    <a-form-item>
                        <a-button type="primary" html-type="submit">Save</a-button>
                        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                    </a-form-item>

                </a-card>
            </div>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { PlusOutlined, UploadOutlined, LoadingOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { useTableData } from "../../hooks/dataTable";
import productService from '../../services/product.service';
import { toImageLink } from '../../services/common.service';
import httpService from '../../services/http.service';
import { Product_API } from '../../services/api_url';
import { message } from 'ant-design-vue';

const { categoriesData, setcategoriesData } = useTableData();
const { brandsData, setBrandsData } = useTableData();
const { colorData, setColorData } = useTableData();

const fileList = ref<any[]>([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');

const beforeUpload = () => {
    return false;
};

interface Props {
    id: string;
}

const props = defineProps<Props>();

async function getProduct(id: number) {
    try {
        const res = await httpService.get(Product_API + `/${id}`);
        const product = res;

        formState.name = product.name || '';
        formState.category = product.categoryId || 1;
        formState.brand = product.brandId || 1;
        formState.discount = product.discount || 0;
        formState.SizeScreen = product.sizeScreen || 0;
        formState.scanhz = product.scanHz || '';
        formState.material = product.material || '';
        formState.RearCam = product.rearCam || '';
        formState.FrontCam = product.frontCam || '';
        formState.Cpu = product.cpu || '';
        formState.Gpu = product.gpu || '';
        formState.Ram = product.ram || 8;
        formState.rom = product.rom || 512;
        formState.Battery = product.battery || '';
        formState.size = product.size || '';
        formState.weight = product.weight || 1;
        formState.version = product.version || '';
        formState.line = product.line || '';

        dynamicValidateForm.colors = product.color.map((color: any) => ({
            colorID: color.colorId || 1,
            file: { url: toImageLink(color.imageUrl), name: color.imageUrl },
            prices: color.prices || 0,
            quantity: color.quantity || 0,
            id: dynamicValidateForm.colors.length + 1,
        }));

        if (product.imageUrls) {
            fileList.value = product.imageUrls.map((url: string) => ({
                url: toImageLink(url),
                originUrl: url,
                name: url,
            }));
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

interface FormState {
    name: string;
    category: number;
    brand: number;
    discount: number;
    SizeScreen: number;
    scanhz: string;
    material: string;
    RearCam: string;
    FrontCam: string;
    Cpu: string;
    Gpu: string;
    Ram: number;
    rom: number;
    Battery: string;
    size: string;
    weight: number;
    version: string;
    line: string;
}

const formState = reactive<FormState>({
    name: '',
    category: 1,
    brand: 1,
    discount: 0,
    SizeScreen: 0,
    scanhz: '',
    material: '',
    RearCam: '',
    FrontCam: '',
    Cpu: '',
    Gpu: '',
    Ram: 8,
    rom: 512,
    Battery: '',
    size: '',
    weight: 1,
    version: '',
    line: '',
});

const dynamicValidateForm = reactive<{ colors: Color[] }>({
    colors: [],
});

const handleColorFileChange = (color: Color, { fileList }: { fileList: any[] }) => {
    color.file = fileList.length ? fileList[0].originFileObj : null;
};

const onFinish = async (values: any) => {
    const formData = new FormData();

    formData.append('Name', formState.name);
    formData.append('Discount', formState.discount.toString());
    formData.append('BrandId', formState.brand.toString());
    formData.append('CategoryId', formState.category.toString());

    dynamicValidateForm.colors.forEach((color, index) => {
        formData.append(`Color[${index}].colorId`, color.colorID.toString());
        formData.append(`Color[${index}].prices`, color.prices.toString());
        formData.append(`Color[${index}].quantity`, color.quantity.toString());
        if (color.file) {
            formData.append(`Color[${index}].file`, color.file);
        }
    });

    formData.append('Details.SizeScreen', formState.SizeScreen.toString());
    formData.append('Details.ScanHz', formState.scanhz);
    formData.append('Details.Material', formState.material);
    formData.append('Details.RearCam', formState.RearCam);
    formData.append('Details.FrontCam', formState.FrontCam);
    formData.append('Details.Cpu', formState.Cpu);
    formData.append('Details.Gpu', formState.Gpu);
    formData.append('Details.Ram', formState.Ram.toString());
    formData.append('Details.Rom', formState.rom.toString());
    formData.append('Details.Battery', formState.Battery.toString());
    formData.append('Details.size', formState.size);
    formData.append('Details.weight', formState.weight.toString());
    formData.append('Details.version', formState.version);
    formData.append('Details.line', formState.line)

    fileList.value.forEach((file) => {
        if (file.originFileObj) {
            formData.append('form', file.originFileObj);
        } else if (file.originUrl) {
            formData.append('imageUrls', file.originUrl);
        }
    });

    // console.log(dynamicValidateForm.colors);
    // console.log(fileList.value);
    // for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }

    try {
        await message.loading('Update product...', 2);
        await httpService.putWithAuth(Product_API + `/${parseInt(props.id)}`, formData);
        message.success('Product update successfully:', 2);
    } catch (error) {
        message.error('Error creating product:', 2);
    }
};

const resetForm = () => {
    formState.name = '';
    formState.category = 1;
    formState.brand = 1;
    formState.discount = 0;
    formState.SizeScreen = 0;
    formState.scanhz = '';
    formState.material = '';
    formState.RearCam = '';
    formState.FrontCam = '';
    formState.Cpu = '';
    formState.Gpu = '';
    formState.Ram = 0;
    formState.rom = 0;
    formState.Battery = '';
    formState.size = '';
    formState.weight = 0;
    formState.version = '';
    formState.line = '';
    dynamicValidateForm.colors = [];
    fileList.value = [];
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
    prices: number,
    quantity: number,
    id: number;
}

const removeColor = (item: Color) => {
    const index = dynamicValidateForm.colors.indexOf(item);
    if (index !== -1) {
        dynamicValidateForm.colors.splice(index, 1);
    }
};

const addColor = () => {
    dynamicValidateForm.colors.push({
        colorID: 1,
        file: null,
        prices: 0,
        quantity: 0,
        id: dynamicValidateForm.colors.length + 1,
    });
};

onMounted(() => {
    getAttribute();
    const id = parseInt(props.id)
    getProduct(id);
});
</script>