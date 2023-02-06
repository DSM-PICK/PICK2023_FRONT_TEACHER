import instance from "@/utils/axios";
import {
  OutingApplyListType,
  OutingStudentListType,
} from "../../../models/outing/response";
import { GetOutingApplyListRequestType } from "@/models/outing/request";

export const schoolComeback = async (studnentId: number) => {
  await instance.patch(`/teachers/${studnentId}`);
};

export const getOutingApplyList = async (
  request: GetOutingApplyListRequestType 
) => {
  const outingRequestList = await instance.get<OutingApplyListType>(
    `/teachers/?grade=${request.grade}&classNum=${request.classNum}`
  );
  return outingRequestList;
};

export const getOutingStudentList = async () => {
  const outingStudentList = await instance.get<OutingStudentListType>(
    `/applications`
  );
  return outingStudentList;
};

export const outingReject = async (outingRequestStudentList: string[]) => {
  await instance.delete(`/applications`, {
    data: {
      user_id_list: outingRequestStudentList,
    },
  });
};

export const outingAccept = async (outingRequestStudentList: string[]) => {
  await instance.patch(`/applications`, {
    user_id_list: outingRequestStudentList,
  });
};
