<template>
    <div class="chart-container">
        <div class="mb-4">
            <a-select v-model:value="statisticMethod" style="width: 250px" size="large" placeholder="Chọn phương thức thống kê">
                <a-select-option value="yearMonth">Nhập Năm và Tháng</a-select-option>
                <a-select-option value="dateRange">Nhập Khoảng Thời Gian</a-select-option>
            </a-select>
        </div>

        <YearMonthStats v-if="statisticMethod === 'yearMonth'" />
        <DateRangeStats v-if="statisticMethod === 'dateRange'" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import YearMonthStats from './Dashboard/YearMonthStats.vue';
import DateRangeStats from './Dashboard/DateRangeStats.vue';

const statisticMethod = ref('yearMonth');
</script>
