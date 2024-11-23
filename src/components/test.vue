<template>
    <a-form layout="vertical" @submit="handleSubmit">
        <a-form-item label="Chọn loại ngày">
            <a-radio-group v-model:value="selectedOption">
                <a-radio value="fixedDate">Khóa 1 ngày</a-radio>
                <a-radio value="anyDate">Khóa đến ngày</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item v-if="selectedOption === 'anyDate'" label="Ngày bất kỳ">
            <a-date-picker v-model:value="anyDate" placeholder="Chọn ngày bất kỳ" :disabled-date="disablePastDates"
                format="YYYY-MM-DD" />
        </a-form-item>

        <a-form-item>
            <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const selectedOption = ref<string>('fixedDate');
const fixedDate = ref<Dayjs | null>(null);
const anyDate = ref<Dayjs | null>(null);

const calculateFixedDate = () => {
    return dayjs().add(1);
};

const disablePastDates = (current: Date) => {
    return current && dayjs(current).isBefore(dayjs(), 'day');
};

const handleSubmit = () => {
    if (selectedOption.value === 'fixedDate') {
        console.log('Ngày cố định:', fixedDate.value?.format());
    } else if (selectedOption.value === 'anyDate') {
        console.log('Ngày bất kỳ:', anyDate.value?.format());
    }
};

onMounted(() => {
    fixedDate.value = calculateFixedDate();
});
</script>
