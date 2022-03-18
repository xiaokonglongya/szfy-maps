import service from "@/utils/request";

export default {
  courseDict() {
    return service("/api/courseDict");
  },
  getCourseList(data = {}) {
    return service("/api/getCourseList", { data });
  },
};
