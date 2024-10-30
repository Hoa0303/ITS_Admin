import axios from "axios";
import { getAuthHeader } from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL + "/api/orders";

const getAll = async (page: number, pageSize: number, search: any) =>
  await axios
    .get(API_URL + "/get-all", {
      params: {
        page: page,
        pageSize: pageSize,
        search: search ?? "",
      },
      headers: getAuthHeader(),
    })
    .then((res) => res.data);

const orderService = {
  getAll,
};
export default orderService;
