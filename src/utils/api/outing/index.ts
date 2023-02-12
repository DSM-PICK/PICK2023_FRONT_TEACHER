import instance from "@/utils/axios";
import {
  OutingApplyListType,
  OutingStudentList,
} from "../../../models/outing/response";
import { GetOutingApplyListRequestType } from "@/models/outing/request";

export const getOutingApplyList = async (
  request: GetOutingApplyListRequestType
) => {
  const outingRequestList = await instance.get<OutingApplyListType>(
    `/teachers/?grade=${request.grade}&classNum=${request.classNum}`
  );
  return outingRequestList;
};

export const getOutingStudentList = async () => {
  const outingStudentList = await instance.get<OutingStudentList>(
    `/applications`
  );
  return outingStudentList;
};
