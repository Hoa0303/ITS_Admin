<template>
    <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <div class="grid grid-cols-5 gap-3">
            <a-form-item class="col-span-2" label="Create Date"
                :rules="{ required: true, message: 'Please select the date!' }">
                <a-date-picker size="large" class="w-full" v-model:value="formState.createDate" disabled />
            </a-form-item>

            <a-form-item class="col-span-2" label="Warehouse Entry Date"
                :rules="{ required: true, message: 'Please select the date!' }">
                <a-date-picker size="large" class="w-full" v-model:value="formState.entryDate"
                    :disabled-date="disableFutureDates" />
            </a-form-item>

            <a-form-item label="Total" :rules="{ required: true, message: 'Please enter the total!' }">
                <a-input-number class="" size="large" v-model:value="total" disabled />
            </a-form-item>
        </div>

        <div>
            <a-form-item label="Note">
                <a-textarea v-model:value="formState.note" placeholder="Enter Note" />
            </a-form-item>
        </div>

        <div v-for="(item, index) in formState.items" :key="index"
            class="border-gray-300 border mb-4 p-2 rounded-md relative shadow-md"
            :class="[(index % 2) === 0 && 'bg-gray-100']">

            <div class="grid grid-cols-3 gap-4 items-center">

                <a-form-item class="col-span-3 mb-2" :name="['items', index, 'productId']" label="Product"
                    :rules="{ required: true, message: 'Please select a product!' }">
                    <a-select size="large" v-model:value="item.productId" :options="productOptions"
                        placeholder="Select Product" @change="onProductChange(item, index)" showSearch
                        optionFilterProp="label" />
                </a-form-item>

                <a-form-item class="mb-2" :name="['items', index, 'colorId']" label="Color"
                    :rules="{ required: true, message: 'Please select a color!' }">
                    <a-select size="large" v-model:value="item.colorId" :disabled="colorOptions.length == 0"
                        :options="colorOptions" placeholder="Select Color" />
                </a-form-item>
                <a-form-item class="mb-2" :name="['items', index, 'quantity']" label="Quantity"
                    :rules="{ required: true, message: 'Please input the quantity!' }">
                    <a-input-number size="large" v-model:value="item.quantity" placeholder="Enter Quantity"
                        style="width: 100%;" />
                </a-form-item>

                <a-form-item class="mb-2" :name="['items', index, 'costPrice']" label="Price"
                    :rules="{ required: true, message: 'Please input the price!' }">
                    <a-input-number size="large" v-model:value="item.costPrice" placeholder="Enter Price"
                        style="width: 100%;" />
                </a-form-item>
            </div>

            <CloseCircleOutlined @click="removeItem(index)"
                class="text-red-500 cursor-pointer absolute top-2 right-2" />
        </div>

        <a-form-item>
            <a-button class="flex justify-center items-center" type="dashed" block @click="addItem">
                <PlusOutlined />
                Add Item
            </a-button>
        </a-form-item>

        <div class="flex justify-end">
            <a-button @click="handleCancel" style="margin-right: 10px">Cancel</a-button>
            <a-button type="primary" @click="handleCreate">Create</a-button>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import { NameData } from '../../hooks/warehouseData';
import { Product_API, Receipt_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { FormInstance, message } from 'ant-design-vue';

const disableFutureDates = (currentDate: Dayjs) => {
    return currentDate.isAfter(dayjs(), 'day');
};

const emit = defineEmits();

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

const handleCancel = () => {
    emit('cancel');
};

async function handleCreate() {
    const allFilled = formState.items.every(item =>
        item.productId && item.colorId && item.quantity > 0 && item.costPrice > 0
    );

    if (!allFilled) {
        message.error("Vui lòng nhập đầy đủ thông tin trước khi tạo!");
        return;
    }
    try {
        const data = {
            entryDate: formState.entryDate.format(),
            total: total.value,
            note: formState.note,
            receiptProducts: formState.items
        };
        console.log(data);
        await httpService.postWithAuth(Receipt_API, data);
        message.success("Add receipt successfully", 1);
        emit('create');
    } catch (error) {
        console.log(error);
        message.error("Fail to add receipt!", 1);
    }
};

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

async function getColor(productId: number) {
    try {
        const res = await httpService.getWithAuth(Product_API + `/color/${productId}`);
        colorOptions.value = res.map((item: NameData) => ({
            value: item.id,
            label: item.name
        }));
    }
    catch (error) {
        console.log(error);
    }
}

const onProductChange = (item: any, index: any) => {
    if (item.productId) {
        getColor(item.productId).then(() => {
            formState.items[index].colorId = undefined;
        });
    } else {
        formState.items[index].colorId = undefined;
    }
};

onMounted(() => {
    getProduct();
});
</script>
