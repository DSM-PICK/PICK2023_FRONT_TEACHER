import instance from "@/utils/axios";
import {
  OutingRequestListType,
  OutingStudentListType,
} from "../../../models/outing/response";

export const schoolComeback = async (studnentId: number) => {
  try {
    await instance.patch(`/teachers/${studnentId}`);
  } catch (error) {
    throw error;
  }
};

export const getOutingRequestList = async (grade: string, classNum: string) => {
  try {
    const outingRequestList = await instance.get<OutingRequestListType>(
      `/teachers/?grade=${grade}&classNum=${classNum}`
    );
    return outingRequestList;
  } catch (error) {
    throw error;
  }
};

export const getOutingStudentList = async () => {
  try {
    const outingStudentList = await instance.get<OutingStudentListType>(
      `/applications`
    );
    return outingStudentList;
  } catch (error) {
    throw error;
  }
};

export const outingReject = async (outingRequestStudentList: string[]) => {
  try {
    await instance.delete(`/applications`, {
      data: {
        user_id_list: outingRequestStudentList,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const outingAccept = async (outingRequestStudentList: string[]) => {
  try {
    await instance.patch(`/applications`, {
      user_id_list: outingRequestStudentList,
    });
  } catch (error) {
    throw error;
  }
};
