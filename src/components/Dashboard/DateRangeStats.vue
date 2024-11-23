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
                    </a-statistic>
                </a-card>
                <a-card>
                    <a-statistic title="Spending" :value="fomratVND(totalSpending)" :precision="2"
                        :value-style="{ color: '#cf1322' }">
                    </a-statistic>
                </a-card>
                <a-card>
                    <a-statistic title="Revenue" :value="fomratVND(revenue)" :precision="2"
                        :value-style="{ color: revenue < 0 ? '#cf1322' : '#3f8600' }" style="margin-right: 50px">
                    </a-statistic>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
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
const revenue = ref(0);

function generateDateRangeLabels(dateFrom: string, dateTo: string): string[] {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const labels: string[] = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        labels.push(formatDateMonth(date));
    }
    return labels;
}

async function getTotalDataByDateRange(dateFrom: string, dateTo: string) {
    const url = `${Statistic_API}/total-revenue?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const res = await httpService.getWithAuth(url);
    if (res) {
        chartData.labels = generateDateRangeLabels(dateFrom, dateTo);
        chartData.datasets[0].data = new Array(chartData.labels.length).fill(0);

        const spendingData = res.spending;
        const salesData = res.sales;

        if (spendingData) {
            spendingData.statisticDateData.forEach((data: any) => {
                const labelIndex = chartData.labels.indexOf(formatDateMonth(new Date(data.time)));
                if (labelIndex !== -1) {
                    chartData.datasets[0].data[labelIndex] = data.statistic;
                }
            });
            totalSpending.value = spendingData.total;
        }

        if (salesData) {
            salesData.statisticDateData.forEach((data: any) => {
                const labelIndex = chartData.labels.indexOf(formatDateMonth(new Date(data.time)));
                if (labelIndex !== -1) {
                    chartData.datasets[1].data[labelIndex] = data.statistic;
                }
            });
            totalSales.value = salesData.total;
        }
        revenue.value = totalSales.value - totalSpending.value;
    }
}


watch([dateFrom, dateTo], () => {
    if (dateFrom.value && dateTo.value) {
        chartData.datasets[0].data = [];
        chartData.datasets[1].data = [];
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
