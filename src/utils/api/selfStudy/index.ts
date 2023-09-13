import instance from "@/utils/axios";
import {
  GetClassList,
  TodaySelfStudyTeacherDto,
  AttendanceStatusList,
  TodaySelfStudyTeacher,
  MovementStatusList,
} from "@/models/selfStudy/response";
import { AttandanceStatusChangeRequestDto } from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacherWhether = async () => {
  const todaySelfStudyTeacherWhether =
    await instance.get<TodaySelfStudyTeacher>(`/pick/admin/state`);
  return todaySelfStudyTeacherWhether.data;
};

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherDto>(
    `/pick/self-study/today`
  );
  return todaySelfStudyTeacher.data;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<GetClassList>(
    `/pick/teachers/responsible`
  );
  return chargeClass.data;
};

export const getAttendanceStatusList = async (classRoom: string) => {
  const attendanceStatusList = await instance.get<AttendanceStatusList>(
    `/pick/teachers/students/${classRoom}`
  );
  return attendanceStatusList.data;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestDto
) => {
  await instance.post(`/pick/teachers/status`, request);
};

export const movementStudentListGet = async (classroom_id: string) => {
  const movementStatus = await instance.get<MovementStatusList>(
    `/pick/teachers/${classroom_id}`
  );
  return movementStatus.data;
};
