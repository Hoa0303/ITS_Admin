<template>
    <div>
        <a-form ref="formRef" :model="formState" layout="vertical" name="user_form_in_modal">
            <a-form-item name="fullname" label="Full Name"
                :rules="[{ required: true, message: 'Please input the full name!' }]">
                <a-input v-model:value="formState.fullname" class="rounded-lg h-9 border-gray-300 w-full" />
            </a-form-item>

            <a-form-item name="email" label="Email"
                :rules="[{ type: 'email', required: true, message: 'Please input a valid email!' }]">
                <a-input v-model:value="formState.email" :disabled="props.id !== null"
                    class="rounded-lg h-9 border-gray-300 w-full" />
            </a-form-item>

            <a-form-item name="password" label="Password" :hidden="props.id !== null" :rules="[
                { required: props.id == null, message: 'Password is required!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
            ]">
                <a-input-password v-model:value="formState.password" size="large" />
            </a-form-item>

            <a-form-item name="phoneNumber" label="Phone Number"
                :rules="[{ required: true, len: 10, message: 'Phone number must be 10 digits!' }]">
                <a-input v-model:value="formState.phoneNumber" class="rounded-lg h-9 border-gray-300 w-full" />
            </a-form-item>

            <a-form-item name="roles" label="Roles"
                :rules="[{ required: true, message: 'Please select at least one role!' }]">
                <a-select mode="tags" v-model:value="formState.roles" placeholder="Select roles" size="large">
                    <a-select-option value="Employee">Employee</a-select-option>
                    <a-select-option value="Stocker">Stocker</a-select-option>
                    <a-select-option value="Statist">Statist</a-select-option>
                    <a-select-option value="User">User</a-select-option>
                </a-select>
            </a-form-item>

            <div class="flex justify-end">
                <a-button @click="handleCancel" style="margin-right: 10px">Cancel</a-button>
                <a-button type="primary" @click="handleCreate">Create</a-button>
            </div>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { message, type FormInstance } from 'ant-design-vue';
import httpService from '../../services/http.service';
import { Auth_API } from '../../services/api_url';
import { UsersData, useTableData } from '../../hooks/userData';

interface Props {
    id?: string;
}
const props = defineProps<Props>();
const emit = defineEmits();

interface FormValues {
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
    roles: string[];
}

const formRef = ref<FormInstance>();
const formState = reactive<FormValues>({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    roles: ['User'],
});

const handleCancel = () => {
    emit('cancel');
};

async function handleCreate() {
    try {
        await formRef.value?.validate();
        const data: any = {
            fullname: formState.fullname,
            phoneNumber: formState.phoneNumber,
            roles: Array.isArray(formState.roles) ? formState.roles : [formState.roles],
        };

        if (props.id == null) {
            data.email = formState.email;
            data.password = formState.password;
            await httpService.postWithAuth(Auth_API + '/create', data);
            message.success("Add user successfully", 1);
        } else {
            await httpService.putWithAuth(Auth_API + `/update/${userDetail.value?.id}`, data);
            message.success("Update user successfully", 1);
        }
        emit('create');
    } catch (error) {
        console.log('Validation failed:', error);
    }
}


const { userDetail, setDetail } = useTableData();

async function getUser() {
    try {
        const res = await httpService.getWithAuth(Auth_API + `/${props.id}`);
        setDetail(res);
    }
    catch (error) {
        console.log(error);
    }
}

watch(userDetail, (newDetail) => {
    if (newDetail) {
        formState.fullname = newDetail.fullName || '';
        formState.email = newDetail.email || '';
        formState.password = '';
        formState.phoneNumber = newDetail.phoneNumber || '';
        formState.roles = newDetail.roles || 'User';
    }
});

watch(() => props.id, (newId) => {
    if (newId) {
        getUser();
    } else {
        formState.fullname = '';
        formState.email = '';
        formState.password = '';
        formState.phoneNumber = '';
        formState.roles = ['User'];
    }
});

onMounted(() => {
    if (props.id) {
        getUser();
    }
});
</script>
