import service from "@/utils/request";
export function getMapsDateByDate(data) {
  return service.post("client/notice/pub/getlistByDate", {
    ...data,
  });
}
