<template>
    <a-form layout="vertical">
        <div class="grid grid-cols-6 gap-3">
            <a-form-item class="col-span-2" label="Create Date">
                <a-date-picker size="large" class="w-full" :value="createAt" format="YYYY-MM-DD" readonly />
            </a-form-item>
            <a-form-item class="col-span-2" label="Warehouse Entry Date">
                <a-date-picker size="large" class="w-full" v-model:value="entryDate" format="YYYY-MM-DD"
                    :disabled-date="disableFutureDates" />
            </a-form-item>

            <a-form-item class="col-span-2" label="Total">
                <a-input-number size="large" class="w-full" v-model:value="total" :formatter="fomratVND" readonly />
            </a-form-item>
        </div>

        <div>
            <a-form-item label="Note">
                <a-textarea size="large" v-model:value="note" placeholder="Enter Note" />
            </a-form-item>
        </div>

        <div v-for="(item, index) in warehouseDetail" :key="index"
            class="border-gray-300 border mb-4 p-2 rounded-md relative shadow-md"
            :class="[(index % 2) === 0 && 'bg-gray-100']">

            <div class="grid grid-cols-3 gap-4 items-center">

                <a-form-item class="col-span-3 mb-2" :label="'ProductId: ' + item.productId">
                    <a-input class="rounded-lg border-gray-300" size="large" :value="item.productName" readonly />
                </a-form-item>

                <a-form-item class="mb-2" :label="'ColorId:' + item.colorId">
                    <a-input class="rounded-lg border-gray-300" size="large" :value="item.colorName" readonly />
                </a-form-item>
                <a-form-item class="mb-2" label="Quantity">
                    <a-input-number size="large" v-model:value="item.quantity" style="width: 100%;"
                        @change="updateTotal" />
                </a-form-item>

                <a-form-item class="mb-2" label="Price">
                    <a-input-number size="large" v-model:value="item.costPrice" style="width: 100%;"
                        @change="updateTotal" />
                </a-form-item>
            </div>
        </div>
        <div class="flex justify-end">
            <a-button @click="handleClose" style="margin-right: 10px">Cancel</a-button>
            <a-button type="primary" @click="handleSave">Update</a-button>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { useTableData, WarehouseData } from '../../hooks/warehouseData';
import httpService from '../../services/http.service';
import { Receipt_API } from '../../services/api_url';
import { fomratVND, formattedDayJs } from '../../services/common.service';
import { message } from 'ant-design-vue';

const disableFutureDates = (currentDate: Dayjs) => {
    return currentDate.isAfter(dayjs(), 'day');
};

const emit = defineEmits();

interface Props {
    id: number;
    receipt: WarehouseData;
}
const props = defineProps<Props>();

const { warehouseDetail, setWarehouseDetail } = useTableData();
const createAt = ref(formattedDayJs(props.receipt.createAt));
const entryDate = ref(formattedDayJs(props.receipt.entryDate));
const total = ref(props.receipt.total);
const note = ref(props.receipt.note);

function updateTotal() {
    total.value = warehouseDetail.value.reduce((acc, item) => acc + (item.quantity * item.costPrice), 0);
}

async function getDetailReceipt(id: number) {
    try {
        const res = await httpService.getWithAuth(Receipt_API + `/${id}`);
        // console.log(res);        
        setWarehouseDetail(res);
    }
    catch (error) {
        console.log(error);
    }
}

const handleClose = () => {
    resetValues();
    emit('close');
};

function resetValues() {
    createAt.value = formattedDayJs(props.receipt.createAt);
    entryDate.value = formattedDayJs(props.receipt.entryDate);
    note.value = props.receipt.note;
}

async function handleSave() {
    try {
        const receiptProducts = warehouseDetail.value.map(item => ({
            productId: item.productId,
            colorId: item.colorId,
            quantity: item.quantity,
            costPrice: item.costPrice
        }));

        const logData = {
            total: total.value,
            note: note.value,
            entryDate: entryDate.value,
            receiptProducts
        };

        console.log(`Log data: ${props.id}`, logData);
        await httpService.putWithAuth(Receipt_API + `/${props.id}`, logData);
        message.success("Add receipt successfully", 1);
        emit('save', logData);
    } catch (error) {
        console.log(error);
        message.error("Fail to add receipt!", 1);
    }
};

watch(() => props.id, (newId) => {
    getDetailReceipt(newId);
});

watch(() => props.receipt, (newReceipt) => {
    createAt.value = formattedDayJs(newReceipt.createAt);
    entryDate.value = formattedDayJs(newReceipt.entryDate);
    total.value = newReceipt.total;
    note.value = newReceipt.note;
}, { deep: true });

onMounted(() => {
    getDetailReceipt(props.id);
})
</script>