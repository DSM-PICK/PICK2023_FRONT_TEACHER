import instance from "@/utils/axios";
import {
  IOutingRequestList,
  IOutingStudentList,
} from "../../../models/outing/response";

export const schoolComeback = async (studnentId: number) => {
  try {
    await instance.patch(`/teachers/${studnentId}`);
  } catch (error) {
    throw error;
  }
};

export const getOutingRequestList = async (
  grade: string,
  classNum: string
): Promise<IOutingRequestList> => {
  try {
    return await instance.get(`/teachers/?grade=${grade}&classNum=${classNum}`);
  } catch (error) {
    throw error;
  }
};

export const getOutingStudentList = async (): Promise<IOutingStudentList> => {
  try {
    return await instance.get(`/applications`);
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
