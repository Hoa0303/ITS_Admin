import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';
import {
    Avatar, Button, Col, Dropdown, Form,
    Input, Menu, Modal, PageHeader, Pagination,
    Row, Image, Table, Card, Radio, InputNumber,
    Upload, Checkbox, Select, Switch
} from 'ant-design-vue';
const components = [
    Button, Input, Form, Avatar, Col, 
    Row, Menu, PageHeader, Dropdown, Pagination, Modal, 
    Image, Table, Card, Upload, Checkbox, 
    Select, Radio, InputNumber, Switch
];

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);
components.forEach(component => app.use(component));

app.use(router)
app.mount('#app');
