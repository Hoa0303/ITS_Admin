<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8 cursor-pointer">
        <a class="flex items-center">
          <svg class="w-12 h-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
              fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
              fill="white" />
          </svg>
          <span class="mx-2 text-2xl font-semibold text-white">ITS-Dashboard</span>
        </a>
      </div>

      <a-menu class="mt-10" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px"
        mode="inline" theme="dark" :items="items" />
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent, ref, h, watchEffect, onMounted, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useSidebar } from "../hooks/useSidebar";
import {
  AppstoreOutlined, DashboardOutlined, ShoppingOutlined,
  DesktopOutlined, ReconciliationOutlined, UserOutlined, FolderOutlined,
  LikeOutlined
} from '@ant-design/icons-vue';
import { getAuthRole } from "../services/auth.service";

export default defineComponent({
  setup() {
    const userRole = ref('');
    const { isOpen } = useSidebar();
    const router = useRouter();
    const route = useRoute();

    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>(['sub1']);

    watchEffect(() => {
      const currentPath = route.path;
      type PathToKeyMap = {
        [key: string]: string;
      };
      const pathToKeyMap: PathToKeyMap = {
        '/dashboard': '1',
        '/order': '2',
        '/product': '3',
        '/review': '4',
        '/user': '5',
        '/warehouse': '6',
        '/brand': '7',
        '/category': '8',
        '/color': '9',
        '/log': '10',
        '/blank': '11',
      };
      selectedKeys.value = [pathToKeyMap[currentPath] || ''];
    });

    const navigateTo = (path: string) => {
      router.push(path);
    };

    const items = ref([
      {
        key: '1',
        icon: () => h(DashboardOutlined, { style: { fontSize: '15px' } }),
        label: 'Dashboard',
        title: 'Dashboard',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/dashboard')
      },
      {
        key: '2',
        icon: () => h(ShoppingOutlined, { style: { fontSize: '15px' } }),
        label: 'Orders',
        title: 'Orders',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/order')
      },
      {
        key: '3',
        icon: () => h(DesktopOutlined, { style: { fontSize: '15px' } }),
        label: 'Products',
        title: 'Products',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/product')
      },
      {
        key: '4',
        icon: () => h(LikeOutlined, { style: { fontSize: '15px' } }),
        label: 'Reviews',
        title: 'Reviews',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/review')
      },
      {
        key: '5',
        icon: () => h(UserOutlined, { style: { fontSize: '15px' } }),
        label: 'User',
        title: 'User',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/user')
      },
      {
        key: '6',
        icon: () => h(ReconciliationOutlined, { style: { fontSize: '15px' } }),
        label: 'Warehouse',
        title: 'Warehouse',
        style: { fontSize: '15px' },
        onClick: () => navigateTo('/warehouse')
      },
      {
        key: 'sub1',
        icon: () => h(AppstoreOutlined, { style: { fontSize: '15px' } }),
        label: 'Orthers',
        title: 'Orthers',
        style: { fontSize: '15px' },
        children: [
          {
            key: '7',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Brands',
            title: 'Brands',
            style: { fontSize: '15px' },
            onClick: () => navigateTo('/brand')
          },
          {
            key: '8',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Category',
            title: 'Category',
            style: { fontSize: '15px' },
            onClick: () => navigateTo('/category')
          },
          {
            key: '9',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Color',
            title: 'Color',
            style: { fontSize: '15px' },
            onClick: () => navigateTo('/color')
          },
          {
            key: '10',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Log',
            title: 'Log',
            style: { fontSize: '15px' },
            onClick: () => navigateTo('/log')
          },
          {
            key: '11',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Blank Page',
            title: 'Blank Page',
            style: { fontSize: '15px' },
            onClick: () => navigateTo('/blank')
          },
        ],
      },
    ]);

    onMounted(() => {
      const role = getAuthRole();
      userRole.value = role[0];
      console.log(userRole.value);

    })

    return {
      isOpen,
      selectedKeys,
      openKeys,
      items,
      navigateTo,
    };
  },
});
</script> -->


<script lang="ts">
import { defineComponent, ref, h, watchEffect, onMounted, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useSidebar } from "../hooks/useSidebar";
import {
  AppstoreOutlined, DashboardOutlined, ShoppingOutlined,
  DesktopOutlined, ReconciliationOutlined, UserOutlined, FolderOutlined,
  LikeOutlined
} from '@ant-design/icons-vue';
import { getAuthRole } from "../services/auth.service";

export default defineComponent({
  setup() {
    const userRole = ref<string[]>([]);
    const { isOpen } = useSidebar();
    const router = useRouter();
    const route = useRoute();

    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>(['sub1']);

    watchEffect(() => {
      const currentPath = route.path;
      const pathToKeyMap: Record<string, string> = {
        '/dashboard': '1',
        '/order': '2',
        '/product': '3',
        '/review': '4',
        '/user': '5',
        '/warehouse': '6',
        '/brand': '7',
        '/category': '8',
        '/color': '9',
        '/log': '10',
        '/blank': '11',
      };
      selectedKeys.value = [pathToKeyMap[currentPath] || ''];
    });

    const navigateTo = (path: string) => {
      router.push(path);
    };

    const allItems = [
      {
        key: '1',
        icon: () => h(DashboardOutlined, { style: { fontSize: '15px' } }),
        label: 'Dashboard',
        title: 'Dashboard',
        onClick: () => navigateTo('/dashboard')
      },
      {
        key: '2',
        icon: () => h(ShoppingOutlined, { style: { fontSize: '15px' } }),
        label: 'Orders',
        title: 'Orders',
        onClick: () => navigateTo('/order')
      },
      {
        key: '3',
        icon: () => h(DesktopOutlined, { style: { fontSize: '15px' } }),
        label: 'Products',
        title: 'Products',
        onClick: () => navigateTo('/product')
      },
      {
        key: '4',
        icon: () => h(LikeOutlined, { style: { fontSize: '15px' } }),
        label: 'Reviews',
        title: 'Reviews',
        onClick: () => navigateTo('/review')
      },
      {
        key: '5',
        icon: () => h(UserOutlined, { style: { fontSize: '15px' } }),
        label: 'User',
        title: 'User',
        onClick: () => navigateTo('/user')
      },
      {
        key: '6',
        icon: () => h(ReconciliationOutlined, { style: { fontSize: '15px' } }),
        label: 'Warehouse',
        title: 'Warehouse',
        onClick: () => navigateTo('/warehouse')
      },
      {
        key: 'sub1',
        icon: () => h(AppstoreOutlined, { style: { fontSize: '15px' } }),
        label: 'Orthers',
        children: [
          {
            key: '7',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Brands',
            onClick: () => navigateTo('/brand')
          },
          {
            key: '8',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Category',
            onClick: () => navigateTo('/category')
          },
          {
            key: '9',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Color',
            onClick: () => navigateTo('/color')
          },
          {
            key: '10',
            icon: () => h(FolderOutlined, { style: { fontSize: '15px' } }),
            label: 'Log',
            onClick: () => navigateTo('/log')
          }
        ]
      }
    ];

    const permissions: Record<string, string[]> = {
      Admin: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      Statist: ['1', '2'],
      Employee: ['2','4', '7', '8', '9'],
      Stocker: ['3', '6', '10']
    };

    const filteredItems = computed(() => {
      const allowedKeys = new Set<string>();

      userRole.value.forEach(role => {
        const rolePermissions = permissions[role] || [];
        rolePermissions.forEach(key => allowedKeys.add(key));
      });

      return allItems.filter(item =>
        allowedKeys.has(item.key) ||
        (item.children && item.children.some(child => allowedKeys.has(child.key)))
      ).map(item => {
        if (item.children) {
          return {
            ...item,
            children: item.children.filter(child => allowedKeys.has(child.key))
          };
        }
        return item;
      });
    });

    onMounted(async () => {
      const role = await getAuthRole();
      userRole.value = role;
    });

    return {
      isOpen,
      selectedKeys,
      openKeys,
      items: filteredItems,
      navigateTo,
    };
  },
});
</script>
