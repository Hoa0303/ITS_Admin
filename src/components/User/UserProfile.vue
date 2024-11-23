<template>
    <div>
        <a-form ref="formRef" :model="formState" layout="vertical" name="user_form_in_modal">
            <a-form-item name="fullName" label="Full Name">
                <a-input v-model:value="formState.fullName" class="rounded-lg h-9 border-gray-300 w-full" readonly />
            </a-form-item>

            <a-form-item name="email" label="Email">
                <a-input v-model:value="formState.email" class="rounded-lg h-9 border-gray-300 w-full" readonly />
            </a-form-item>

            <a-form-item name="phoneNumber" label="Phone Number">
                <a-input v-model:value="formState.phoneNumber" class="rounded-lg h-9 border-gray-300 w-full" readonly />
            </a-form-item>

            <a-form-item name="roles" label="Roles">
                <a-select v-model:value="formState.roles" mode="tags" size="large" class="w-full" disabled />
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import httpService from "../../services/http.service";
import { User_API } from "../../services/api_url";

interface User {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    phoneNumber: string;
    imageUrl?: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<User>({
    id: '',
    fullName: '',
    email: '',
    roles: [],
    phoneNumber: '',
    imageUrl: '',
});

const getUserDetail = async () => {
    try {
        const response = await httpService.getWithAuth(User_API + '/infor');
        Object.assign(formState, response);
    } catch (error) {
        console.error("Failed to fetch user details", error);
    }
};

onMounted(() => {
    getUserDetail();
})
</script>
