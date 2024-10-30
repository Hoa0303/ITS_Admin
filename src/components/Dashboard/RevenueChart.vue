<template>
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
</script>