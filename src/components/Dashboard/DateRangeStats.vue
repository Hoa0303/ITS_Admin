<template>
    <div>
        <div class="grid grid-cols-4 gap-3 mb-4">
            <input class="rounded-lg border-gray-200" type="date" v-model="dateFrom" placeholder="From Date" />
            <input class="rounded-lg border-gray-200" type="date" v-model="dateTo" placeholder="To Date" />
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
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import httpService from '../../services/http.service';
import { Statistic_API } from '../../services/api_url';
import { fomratVND, formatDate, formatDateMonth } from '../../services/common.service';

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

const dateFrom = ref<string | null>(null);
const dateTo = ref<string | null>(null);

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
            text: `Spending and Sales Chart form ${formatDate(dateFrom.value!)} to ${formatDate(dateTo.value!)}`
            ,
            font: {
                size: 25
            }
        }
    }
}));

const totalSpending = ref();
const totalSales = ref();
async function getTotalDataByDateRange(dateFrom: string, dateTo: string) {
    const spendingUrl = `${Statistic_API}/total-spending?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const salesUrl = `${Statistic_API}/total-sales?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const [spendingRes, salesRes] = await Promise.all([
        httpService.getWithAuth(spendingUrl),
        httpService.getWithAuth(salesUrl)
    ]);

    if (spendingRes) {
        chartData.labels = Object.keys(spendingRes.statisticData).map(date => formatDateMonth(date));
        chartData.datasets[0].data = Object.values(spendingRes.statisticData);
        totalSpending.value = spendingRes.total;
    }
    if (salesRes) {
        chartData.datasets[1].data = Object.values(salesRes.statisticData);
        totalSales.value = salesRes.total;
    }
}

watch([dateFrom, dateTo], () => {
    if (dateFrom.value && dateTo.value) {
        getTotalDataByDateRange(dateFrom.value, dateTo.value);
    }
});

onMounted(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    dateFrom.value = firstDayOfMonth.toISOString().split('T')[0];
    dateTo.value = today.toISOString().split('T')[0];
    getTotalDataByDateRange(dateFrom.value, dateTo.value);
});
</script>
