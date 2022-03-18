import service from "@/utils/request";
export function userLogin(account: string, password: string) {
  return service("/api/login", {
    method: "post",
    data: {
      account,
      password,
    },
  });
}
