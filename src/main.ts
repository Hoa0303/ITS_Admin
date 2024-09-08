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

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

app.use(router)
app.use(Button)
app.use(Input)
app.use(Form)
app.use(Avatar)
app.use(Col)
app.use(Row)
app.use(Menu)
app.use(PageHeader)
app.use(Dropdown)
app.use(Pagination)
app.use(Modal)
app.use(Image)
app.use(Table)
app.use(Card)
app.use(Upload)
app.use(Checkbox)
app.use(Select)
app.use(Radio)
app.use(InputNumber)
app.use(Switch)
app.mount('#app');
