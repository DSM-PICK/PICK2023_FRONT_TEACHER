import instance from "@/utils/axios";
import {
  IChargeClass,
  ITodaySelfStudyTeacher,
  IAttendanceStatusList,
} from "@/models/selfStudy/response";
import { IStudentStatus } from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacher =
  async (): Promise<ITodaySelfStudyTeacher> => {
    try {
      return await instance.get(`/self-study/today`);
    } catch (error) {
      throw error;
    }
  };

export const getChargeClass = async (): Promise<IChargeClass> => {
  try {
    return await instance.get(`/teachers/owner`);
  } catch (error) {
    throw error;
  }
};

export const getAttendanceStatusList = async (
  classRoom: string,
  type: string
): Promise<IAttendanceStatusList> => {
  try {
    return await instance.get(`/teachers/students/${classRoom}?type=${type}`);
  } catch (error) {
    throw error;
  }
};

export const AttandanceStatusChange = async (
  classroomId: string,
  body: IStudentStatus
) => {
  try {
    await instance.patch(`/teachers/status/${classroomId}`, body);
  } catch (error) {
    throw error;
  }
};
