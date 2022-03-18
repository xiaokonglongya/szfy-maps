import { mock } from "mockjs";
import {
  createApiErrorResponseConstruction,
  createApiResponseConstruction,
} from "..";
import Home from "../JSON/index/index.json";
import Dict from "../JSON/course/dict.json";
import News from "../JSON/news";
const Category = Home.indexCategory;

/**
 * 获取banner数据
 * @returns 模拟的banner
 */
let banner = Home.banners;
mock("/api/getBanner", "get", {
  ...createApiResponseConstruction(banner),
});

/**
 * 获取首页新闻列表
 */
const news = News.news;
mock("/api/getNews", "get", {
  ...createApiResponseConstruction(news),
});

function getnewDetails(id: number) {
  let AllCourse = news;
  let result = AllCourse.find((e) => e.id == id);
  return result ?? null;
}
mock(new RegExp("/api/getNewDetailsById" + ".*"), "get", (option: any) => {
  if (option.body) {
    let { id } = JSON.parse(option.body);
    let result = getnewDetails(id);
    return mock({
      ...createApiResponseConstruction(result),
    });
  } else {
    return mock({ ...createApiErrorResponseConstruction("缺少参数") });
  }
});

/**
 * 获取首页分类
 */
mock("/api/getHomeCategory", "get", {
  ...createApiResponseConstruction(Category),
});

/**
 * 获取首页分类下的合作机构数据
 */
let AllCategoty = Dict.category1;
function getOrganizationList(id: string) {
  let result = AllCategoty.find((e) => e.id === id);
  return result ? result.childrens : [];
}
mock(
  RegExp("/api/getOrganizationByCategotyId" + ".*"),
  "get",
  (option: { categotyId: string; url: string; body: null | string }) => {
    if (option.body) {
      let { categotyId = null } = JSON.parse(option.body);
      if (!categotyId)
        return mock({
          ...createApiErrorResponseConstruction("缺少参数:categotyId"),
        });
      let result = getOrganizationList(categotyId);
      return mock({
        ...createApiResponseConstruction(result),
      });
    } else {
      return mock({ ...createApiErrorResponseConstruction("缺少参数") });
    }
  }
);
