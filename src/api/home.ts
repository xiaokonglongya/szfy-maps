import service from "@/utils/request";
export function getMapsDateByDate<T>(data):Promise<T> {
  return service.post("client/notice/pub/getlistByDate", {
    ...data,
  });
}
