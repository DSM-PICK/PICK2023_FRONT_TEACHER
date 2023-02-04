import instance from "@/utils/axios";
import {
  ChargeClassType,
  TodaySelfStudyTeacherType,
  AttendanceStatusListType,
} from "@/models/selfStudy/response";
import { StudentStatusType } from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacher = async () => {
  try {
    const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherType>(
      `/self-study/today`
    );
    return todaySelfStudyTeacher;
  } catch (error) {
    throw error;
  }
};

export const getChargeClass = async () => {
  try {
    const chargeClass = await instance.get<ChargeClassType>(`/teachers/owner`);
    return chargeClass;
  } catch (error) {
    throw error;
  }
};

export const getAttendanceStatusList = async (
  classRoom: string,
  type: string
) => {
  try {
    const attendanceStatusList = await instance.get<AttendanceStatusListType>(
      `/teachers/students/${classRoom}?type=${type}`
    );
    return attendanceStatusList;
  } catch (error) {
    throw error;
  }
};

export const attandanceStatusChange = async (
  classroomId: string,
  body: StudentStatusType
) => {
  try {
    await instance.patch(`/teachers/status/${classroomId}`, body);
  } catch (error) {
    throw error;
  }
};
