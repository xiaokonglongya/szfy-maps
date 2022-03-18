const TokenKey = "userToken";
const UserKey = "infoKey";
/**
 * 获取用户信息
 */
export function getLocalUser() {
  try {
    return JSON.parse(sessionStorage.getItem(UserKey) ?? "");
  } catch (error) {}
}

/**
 * 设置本地用户信息
 * @param info 用户信息
 */
export function setLocalUser(info) {
  try {
    sessionStorage.setItem(UserKey, JSON.stringify(info));
  } catch (error) {}
}

export function isUserLogin() {
  return getLocalUser() ? true : false;
}
export function clearLocaUser() {
  sessionStorage.removeItem(UserKey);
}
