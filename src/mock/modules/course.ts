import { mock } from "mockjs";
import {
  createApiErrorResponseConstruction,
  createApiResponseConstruction,
} from "..";
import Home from "../JSON/index/index.json";
import Dict from "../JSON/course/dict.json";
import Course from "../JSON/course/course"
/**
 * 获取课程数据的筛选规格条件
 * @returns 课程的分类数据
 */
let data = {
  form: Dict.category1,
  quality: Dict.category2,
  classAge: Dict.category3,
};
mock("/api/courseDict", "get", {
  ...createApiResponseConstruction(data),
});

/**
 * 获取首页新闻列表
 */
const news = Home.news;
mock("api/getNews", "get", {
  ...createApiResponseConstruction(news),
});

/**
 * 获取首页分类
 */
const Category = Home.indexCategory;
mock("/api/getHomeCategory", "get", {
  ...createApiResponseConstruction(Category),
});

/**
 * 获取课程列表
 *
 */
const courseList = Course.courseList;

/**
 * 根据不同条件获取课程列表
 * @param rootSource //如：政府、机构、企业等
 * @param childSource
 * @param rootSort //如：德育、智育、体育等
 * @param childSort
 * @param rootGrade //如：1年级、2年级
 * @param childGrade // 具体年纪
 */
interface ParamsDataType {
  rootSource?: string;
  childSource?: string;
  rootSort?: string;
  childSort?: string;
  rootGrade?: string;
  childGrade?: string;
  name?: string;
}
function getCourseList({
  rootSource,
  childSource,
  rootSort,
  childSort,
  rootGrade,
  childGrade,
  name,
}: ParamsDataType) {
  let result = courseList;
  let paramsObj: ParamsDataType = {
    rootSource,
    childSource,
    rootSort,
    childSort,
    rootGrade,
    childGrade,
  };
  for (const key in paramsObj) {
    if (paramsObj[key as keyof ParamsDataType]) {
      result = result.filter(
        (e) =>
          e[key as keyof ParamsDataType] ===
          paramsObj[key as keyof ParamsDataType]
      );
    }
    // 如果传入了名字,就模糊查询一下
    if (name) {
      result = result.filter((e) => e.name.includes(name));
    }
  }
  return result;
}
mock(new RegExp("/api/getCourseList" + ".*"), "get", (option: any) => {
  if (option.body) {
    let paramsObj = JSON.parse(option.body);
    let result = getCourseList(paramsObj);
    return mock({
      ...createApiResponseConstruction(result),
    });
  } else {
    return mock({ ...createApiErrorResponseConstruction("缺少参数") });
  }
});

/**
 * 获取课程详情
 * url /api/getCourseDetails
 */
function getCourseDetails(id: string) {
  let AllCourse = Course.courseList;
  let result = AllCourse.find((e) => e.id == id);
  return result ?? null;
}
mock(new RegExp("/api/getCourseDetails" + ".*"), "get", (option: any) => {
  if (option.body) {
    let { id } = JSON.parse(option.body);
    let result = getCourseDetails(id);
    return mock({
      ...createApiResponseConstruction(result),
    });
  } else {
    return mock({ ...createApiErrorResponseConstruction("缺少参数") });
  }
});

/**
 * 获取推荐课程
 * @returns
 */
function getRandomCourse() {
  let AllCourse = Course.courseList;
  let allCourseLength = AllCourse.length;
  let random = Math.floor(Math.random() * (allCourseLength - 1)) + 1;
  let ranDomCourse = AllCourse[random - 1];
  return {
    ...ranDomCourse,
    orgInfo: getOrganizationInfo(
      ranDomCourse.rootSource,
      ranDomCourse.childSource
    ),
  };
}

function getOrganizationInfo(rootSource: string, childSource: string) {
  let result;
  let parentCate = Dict.category1.find((e) => e.id === rootSource);
  if (parentCate) {
    let childCate = parentCate.childrens.find((e) => e.id === childSource);
    result = childCate ?? null;
  }
  return result;
}
mock(new RegExp("/api/getCourseRelated" + ".*"), "get", (option: any) => {
  let result = new Array(8).fill(null).map((e) => getRandomCourse());
  return mock({
    ...createApiResponseConstruction(result),
  });
});
