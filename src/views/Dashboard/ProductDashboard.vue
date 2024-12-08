<template>
    <div class="">
        <h3 class="text-3xl font-medium text-gray-700">Product Statistic</h3>

        <div class="my-8">
            <StatisticChart />
        </div>
    </div>

    <div class="">
        <h3 class="text-3xl font-medium text-gray-700">Best Selling Products</h3>

        <div class="my-8">
            <SoldStatistic />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SoldStatistic from '../../components/ProductDashboard/SoldStatistic.vue';
import StatisticChart from '../../components/ProductDashboard/StatisticChart.vue';


</script>