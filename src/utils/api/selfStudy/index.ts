import instance from "@/utils/axios";
import {
  ChargeClassType,
  TodaySelfStudyTeacherType,
  AttendanceStatusListType,
} from "@/models/selfStudy/response";
import {
  GetAttendanceStatusRequestType,
  AttandanceStatusChangeRequestType,
} from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherType>(
    `/self-study/today`
  );
  return todaySelfStudyTeacher;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<ChargeClassType>(`/teachers/owner`);
  return chargeClass;
};

export const getAttendanceStatusList = async (
  request: GetAttendanceStatusRequestType
) => {
  const attendanceStatusList = await instance.get<AttendanceStatusListType>(
    `/teachers/students/${request.classRoom}?type=${request.type}`
  );
  return attendanceStatusList;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestType
) => {
  await instance.patch(`/teachers/status/${request.classRoom}`, request.body);
};
