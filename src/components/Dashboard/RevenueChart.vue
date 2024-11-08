<!-- <template>
    <div>
        <div class="grid grid-cols-4 gap-3 mb-4">
            <a-input-number class="w-full" v-model:value="year" placeholder="Enter Year" size="large" />
            <a-input-number class="w-full" v-model:value="month" placeholder="Enter Month (1-12)" :min="0" :max="12"
                size="large" />
        </div>

        <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import httpService from '../../services/http.service';
import { Statistic_API } from '../../services/api_url';

Chart.register(...registerables);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string;
        borderWidth: number;
    }[];
}

const year = ref<number | null>(2024);
const month = ref<number | null>(null);

const chartData = reactive<ChartData>({
    labels: [],
    datasets: [
        {
            label: 'Revenvue (VND)',
            data: [],
            backgroundColor: Array(31).fill('#77CEFF'),
            borderColor: '#000',
            borderWidth: 1,
        }
    ]
});

const chartOptions = computed(() => ({
    responsive: true,
    plugins: {
        legend: { position: 'bottom' },
        title: {
            display: true,
            text: month.value
                ? `Revenvue Chart for ${month.value} - ${year.value}`
                : `Revenvue Chart for ${year.value}`,
            font: {
                size: 25
            }
        }
    }
}));

async function getTotalRevenvue(year: number, month: number | null) {
    const url = `${Statistic_API}/total-revenue?year=${year}${month ? `&month=${month}` : ''}`;
    const res = await httpService.getWithAuth(url);
    if (res) {
        chartData.labels = month ? Array(31).fill(0).map((_, i) => `${i + 1}`) : Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        chartData.datasets[0].data = Object.values(res.statisticData);
    }
}

watch([year, month], () => {
    if (year.value) {
        getTotalRevenvue(year.value, month.value);
    }
});

onMounted(() => {
    getTotalRevenvue(year.value!, month.value);
});
</script> -->

<template>
    <div>
        <div class="grid grid-cols-4 gap-3 mb-4">
            <a-input-number class="w-full" v-model:value="year" placeholder="Enter Year" size="large" />
            <a-input-number class="w-full" v-model:value="month" placeholder="Enter Month (1-12)" :min="1" :max="12"
                size="large" />
        </div>

        <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import httpService from '../../services/http.service';
import { Statistic_API } from '../../services/api_url';

Chart.register(...registerables);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        fill: string;
    }[];
}

const year = ref<number | null>(2024);
const month = ref<number | null>(null);

const chartData = reactive<ChartData>({
    labels: [],
    datasets: [
        {
            label: 'Revenue (VND)',
            data: [],
            backgroundColor: 'rgba(119, 206, 255, 0.5)',
            borderColor: '#77CEFF',
            borderWidth: 2,
            fill: 'origin',
        }
    ]
});

const chartOptions = computed(() => ({
    responsive: true,
    plugins: {
        legend: { position: 'bottom' },
        title: {
            display: true,
            text: month.value
                ? `Revenue Chart for ${month.value} - ${year.value}`
                : `Revenue Chart for ${year.value}`,
            font: { size: 25 }
        }
    }
}));

async function getTotalRevenue(year: number, month: number | null) {
    const url = `${Statistic_API}/total-revenue-by-year?year=${year}${month ? `&month=${month}` : ''}`;
    const res = await httpService.getWithAuth(url);

    if (res) {
        const spendingData = res.spending.statisticData;
        const salesData = res.sales.statisticData;

        if (month) {
            chartData.labels = Array(31).fill(0).map((_, i) => `${i + 1}`);
            const dailyRevenue = Array(31).fill(0);

            const dailySales = Array(31).fill(0);
            const dailySpending = Array(31).fill(0);

            salesData.map((sale: any) => {
                dailySales[sale.time - 1] = sale.statistic;
            })

            spendingData.map((spend: any) => {
                dailySpending[spend.time - 1] = spend.statistic;
            })

            dailyRevenue.forEach((_, index) => {
                dailyRevenue[index] = dailySales[index] - dailySpending[index];
            });

            chartData.datasets[0].data = dailyRevenue;
        } else {
            chartData.labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
            const monthlyRevenue = Array(12).fill(0);

            const monthlySales = Array(12).fill(0);
            const monthlySpending = Array(12).fill(0);

            salesData.map((sale: any) => {
                monthlySales[sale.time - 1] = sale.statistic;
            })

            spendingData.map((spend: any) => {
                monthlySpending[spend.time - 1] = spend.statistic;
            })

            monthlyRevenue.forEach((_, index) => {
                monthlyRevenue[index] = monthlySales[index] - monthlySpending[index];
            });

            chartData.datasets[0].data = monthlyRevenue;
        }
    }
}

watch([year, month], () => {
    if (year.value) {
        chartData.labels = [];
        chartData.datasets[0].data = [];
        getTotalRevenue(year.value, month.value);
    }
});

onMounted(() => {
    getTotalRevenue(year.value!, month.value);
});
</script>