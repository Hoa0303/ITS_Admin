import { ref } from "vue";

export interface UsersData {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  lockedOut: boolean;
  createAt: string;
  updateAt: string;
}

export enum Role {
  "Admin",
  "Employee",
  "Stocker",
  "Statist",
  "User",
}

export function useTableData() {
  const usersData = ref<UsersData[]>([]);
  function setUserData(data: UsersData[]) {
    usersData.value = data;
  }

  const userDetail = ref<UsersData>();
  function setDetail(data: UsersData) {
    userDetail.value = data;
  }

  return {
    usersData,
    setUserData,
    userDetail,
    setDetail,
  };
}
