import { mock } from "mockjs";
import "./modules/home";
import "./modules/course";
import "./modules/testparpe"
import './modules/user'
export function createApiResponseConstruction<T>(result: T) {
  return {
    code: 200,
    message: "获取成功",
    data: result,
  };
}

export function createApiErrorResponseConstruction<T>(error: T) {
  return {
    code: 502,
    message: error,
    data: null,
  };
}
