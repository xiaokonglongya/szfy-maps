import { mock } from "mockjs";
import {
  createApiErrorResponseConstruction,
  createApiResponseConstruction,
} from "..";
import Examination from "../JSON/examination.json";

/**
 * 获取试卷列表
 * @returns 模拟的banner
 */
const examinationData = Examination.examinationData;

mock("/api/getTestParpeList", "get", {
  ...createApiResponseConstruction(examinationData),
});
