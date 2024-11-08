<template>
    <a-form layout="vertical">
        <div class="grid grid-cols-6 gap-3">
            <a-form-item class="col-span-2" label="Create Date">
                <a-date-picker size="large" class="w-full" :value="formattedDayJs(props.log.createAt)"
                    format="YYYY-MM-DD" readonly />
            </a-form-item>
            <a-form-item class="col-span-2" label="Warehouse Entry Date">
                <a-date-picker size="large" class="w-full" :value="formattedDayJs(props.log.entryDate)"
                    format="YYYY-MM-DD" readonly />
            </a-form-item>

            <a-form-item class="col-span-2" label="Total">
                <a-input-number size="large" class="w-full" :value="fomratVND(props.log.total)" readonly />
            </a-form-item>
        </div>

        <div>
            <a-form-item label="Note">
                <a-textarea size="large" :value="props.log.note" placeholder="Enter Note" readonly />
            </a-form-item>
        </div>

        <div v-for="(item, index) in logDetail" :key="index"
            class="border-gray-300 border mb-4 p-2 rounded-md relative shadow-md"
            :class="[(index % 2) === 0 && 'bg-gray-100']">

            <div class="grid grid-cols-3 gap-4 items-center">

                <a-form-item class="col-span-3 mb-2" label="Product">
                    <a-input class="rounded-lg border-gray-300" size="large" :value="item.productName" readonly />
                </a-form-item>

                <a-form-item class="mb-2" label="Color">
                    <a-input class="rounded-lg border-gray-300" size="large" :value="item.colorName" readonly />
                </a-form-item>
                <a-form-item class="mb-2" label="Quantity">
                    <a-input-number size="large" :value="item.quantity" style="width: 100%;" readonly />
                </a-form-item>

                <a-form-item class="mb-2" label="Price">
                    <a-input-number size="large" :value="fomratVND(item.costPrice)" style="width: 100%;" readonly />
                </a-form-item>
            </div>
        </div>
    </a-form>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { LogData, useTableData } from '../../hooks/warehouseData';
import httpService from '../../services/http.service';
import { Log_API } from '../../services/api_url';
import { fomratVND, formattedDayJs } from '../../services/common.service';

const emit = defineEmits();

interface Props {
    id: number;
    log: LogData;
}
const props = defineProps<Props>();

const { logDetail, setLogDetail } = useTableData();

async function getDetail(id: number) {
    try {
        const res = await httpService.getWithAuth(Log_API + `/${props.id}`);
        setLogDetail(res);
    }
    catch (error) {
        console.log(error);
    }
}

watch(() => props.id, (newId) => {
    getDetail(newId);
});

onMounted(() => {
    getDetail(props.id);
})

</script>