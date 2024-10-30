<template>
    <div>
        <div class="grid grid-cols-4 gap-3 mb-4">
            <a-input-number class="w-full" v-model:value="year" placeholder="Enter Year" size="large" />
            <a-input-number class="w-full" v-model:value="month" placeholder="Enter Month (1-12)" :min="0" :max="12"
                size="large" />
        </div>

        <div class="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
            <!-- Chart -->
            <BarChart class="col-span-3" :chartData="chartData" :options="chartOptions" />
            <!--  -->
            <div class="flex flex-col justify-center gap-10">
                <a-card>
                    <a-statistic title="Sales" :value="fomratVND(totalSales)" :precision="2"
                        :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        <template #prefix>
                            <arrow-up-outlined />
                        </template>
                    </a-statistic>
                </a-card>
                <a-card>
                    <a-statistic title="Spending" :value="fomratVND(totalSpending)" :precision="2"
                        :value-style="{ color: '#cf1322' }">
                        <template #prefix>
                            <arrow-down-outlined />
                        </template>
                    </a-statistic>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import httpService from '../../services/http.service';
import { Statistic_API } from '../../services/api_url';
import { fomratVND } from '../../services/common.service';

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
            label: 'Spending (VND)',
            data: [],
            backgroundColor: Array(31).fill('#77CEFF'),
            borderColor: '#000',
            borderWidth: 1,
        },
        {
            label: 'Sales (VND)',
            data: [],
            backgroundColor: Array(31).fill('#FFA500'),
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
                ? `Spending and Sales Chart for ${month.value} - ${year.value}`
                : `Spending and Sales Chart for ${year.value}`,
            font: {
                size: 25
            }
        }
    }
}));

const totalSpending = ref();
const totalSales = ref();

async function getTotalSpending(year: number, month: number | null) {
    const url = `${Statistic_API}/total-spending-by-year?year=${year}${month ? `&month=${month}` : ''}`;
    const res = await httpService.getWithAuth(url);
    if (res) {
        chartData.labels = month ? Array(31).fill(0).map((_, i) => `${i + 1}`) : Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        chartData.datasets[0].data = Object.values(res.statisticData);
        totalSpending.value = res.total;
    }
}

async function getTotalSales(year: number, month: number | null) {
    const url = `${Statistic_API}/total-sales-by-year?year=${year}${month ? `&month=${month}` : ''}`;
    const res = await httpService.getWithAuth(url);
    if (res) {
        chartData.datasets[1].data = Object.values(res.statisticData);
        totalSales.value = res.total;
    }
}

watch([year, month], () => {
    if (year.value) {
        getTotalSpending(year.value, month.value);
        getTotalSales(year.value, month.value);
    }
});

onMounted(() => {
    getTotalSpending(year.value!, month.value);
    getTotalSales(year.value!, month.value);
});
</script>
