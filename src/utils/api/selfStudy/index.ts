import instance from "@/utils/axios";
import {
  GetClassList,
  TodaySelfStudyTeacherDto,
  AttendanceStatudList,
  TodaySelfStudyTeacher,
} from "@/models/selfStudy/response";
import { AttandanceStatusChangeRequestDto } from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacherWhether = async () => {
  const todaySelfStudyTeacherWhether =
    await instance.get<TodaySelfStudyTeacher>(`/pick/admin/state`);
  return todaySelfStudyTeacherWhether;
};

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherDto>(
    `/pick/self-study/today`
  );
  return todaySelfStudyTeacher;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<GetClassList>(
    `/pick/teachers/responsible`
  );
  return chargeClass;
};

export const getAttendanceStatusList = async (classRoom: string) => {
  const attendanceStatusList = await instance.get<AttendanceStatudList>(
    `/pick/teachers/students/${classRoom}`
  );
  return attendanceStatusList;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestDto
) => {
  await instance.post(`/pick/teachers/status`, request);
};

export const movementStudentListGet = async (classroom_id: string) => {
  await instance.get(`/pick/teachers/${classroom_id}`);
};
