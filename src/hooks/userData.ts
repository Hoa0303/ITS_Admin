import { ref } from "vue";

export interface UsersData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createAt: string;
  updateAt: string;
}

export function useTableData() {
  const usersData = ref<UsersData[]>([]);
  function setUserData(data: UsersData[]) {
    usersData.value = data;
  }

  return {
    usersData,
    setUserData,
  };
}
