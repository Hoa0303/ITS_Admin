<template>
    <div>
        <div class="grid grid-cols-4 gap-3 mb-4">
            <a-input-number class="w-full" v-model:value="year" placeholder="Enter Year" size="large" />
            <a-input-number class="w-full" v-model:value="month" placeholder="Enter Month (1-12)" :min="0" :max="12"
                size="large" />
            <a-select size="large" class="col-span-2" v-model:value="selectedId" :options="productOptions"
                placeholder="Select Product" @change="onProductChange(selectedId)" showSearch
                optionFilterProp="label" />
        </div>

        <div class="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
            <BarChart class="col-span-3" :chartData="chartData" :options="chartOptions" />
            <div class="flex flex-col justify-center gap-10">
                <a-card>
                    <a-statistic title="Spending" :value="fomratVND(totalSpending)" :precision="2"
                        :value-style="{ color: '#FFA500' }">
                    </a-statistic>
                </a-card>
                <a-card>
                    <a-statistic title="Sales" :value="fomratVND(totalSales)" :precision="2"
                        :value-style="{ color: '#77CEFF' }" style="margin-right: 50px">
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
import { Chart, registerables } from "chart.js";
import httpService from '../../services/http.service';
import { Product_API, Statistic_API } from '../../services/api_url';
import { fomratVND } from '../../services/common.service';
import { NameData } from '../../hooks/warehouseData';

Chart.register(...registerables);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
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
            backgroundColor: '#FFA500',
            borderColor: '#000',
            borderWidth: 1,
        },
        {
            label: 'Sales (VND)',
            data: [],
            backgroundColor: '#77CEFF',
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

const totalSpending = ref(0);
const totalSales = ref(0);
const revenue = ref(0);

async function getTotalSpending(year: number, month: number | null, id: number) {
    const url = `${Statistic_API}/total-product-revenue-by-year?year=${year}${month ? `&month=${month}` : ''}&productId=${id}`;
    const res = await httpService.getWithAuth(url);
    if (res) {
        chartData.labels = month ? Array(31).fill(0).map((_, i) => `${i + 1}`) : Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const spendingData = res.spending;
        const salesData = res.sales;

        if (spendingData) {
            spendingData.statisticData.map((e: any) => {
                chartData.datasets[0].data[e.time - 1] = e.statistic
            })
            totalSpending.value = spendingData.total;
        }

        if (salesData) {
            salesData.statisticData.map((e: any) => {
                chartData.datasets[1].data[e.time - 1] = e.statistic
            })
            totalSales.value = salesData.total;
        }
        revenue.value = totalSales.value - totalSpending.value;
    }
}

const productOptions = ref([]);
const selectedId = ref(4);

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

const onProductChange = (id: number) => {
    selectedId.value = id;
    // console.log(selectedId.value);
};

watch([year, month, selectedId], () => {
    if (year.value) {
        chartData.datasets[0].data = [];
        chartData.datasets[1].data = [];
        getTotalSpending(year.value, month.value, selectedId.value);
    }
});

onMounted(() => {
    getTotalSpending(year.value!, month.value, selectedId.value);
    getProduct();
});
</script>