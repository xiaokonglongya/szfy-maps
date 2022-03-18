import axios from "axios";
// import "@/mock/index";
import { useMessage } from "naive-ui";
const message = useMessage();
const service = axios.create({
  timeout: 10 * 1000,
  baseURL: "https://szfy-maps.tenghao510.com/http/router/",
});
service.interceptors.response.use(
  (response) => {
  console.log("🚀 ~ file: request.ts ~ line 12 ~ response", response)
    if (response.data.code === 0) {
      return response.data;
    }
    if (response.data.code === 502) {
      window.$message.error(response.data.message || "系统错误");
      new Error(response.data.message);
    }
  },
  (error) => {}
);
export default service;
