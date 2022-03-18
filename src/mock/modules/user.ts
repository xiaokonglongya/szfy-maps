import { mock } from "mockjs";
import {
  createApiErrorResponseConstruction,
  createApiResponseConstruction,
} from "..";
import User from "../JSON/user";

/**
 * 获取试卷列表
 * @returns 模拟的banner
 */
let AllUser = User.users;

function getUserInfo(account, password) {
  return AllUser.find((e) => e.account === account && password === password);
}
mock("/api/login", "post", (option) => {
  let { account = "", password = "" } = JSON.parse(option.body);
  {
    let result = getUserInfo(account, password);
    if (result) {
      return mock({ ...createApiResponseConstruction(result) });
    } else {
      return mock({
        ...createApiErrorResponseConstruction("账号或密码错误,请确认后再试！"),
      });
    }
  }
});
