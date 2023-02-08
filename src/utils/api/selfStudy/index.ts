import instance from "@/utils/axios";
import {
  ChargeClassDto,
  TodaySelfStudyTeacherDto,
  AttendanceStatusListDto,
} from "@/models/selfStudy/response";
import {
  GetAttendanceStatusRequestDto,
  AttandanceStatusChangeRequestDto,
} from "@/models/selfStudy/request";

export const getTodaySelfStudyTeacher = async () => {
  const todaySelfStudyTeacher = await instance.get<TodaySelfStudyTeacherDto>(
    `/self-study/today`
  );
  return todaySelfStudyTeacher;
};

export const getChargeClass = async () => {
  const chargeClass = await instance.get<ChargeClassDto>(
    `/teachers/responsible`
  );
  return chargeClass;
};

export const getAttendanceStatusList = async (
  request: GetAttendanceStatusRequestDto
) => {
  const attendanceStatusList = await instance.get<AttendanceStatusListDto>(
    `/teachers/students/${request.classRoom}?type=${request.type}`
  );
  return attendanceStatusList;
};

export const attandanceStatusChange = async (
  request: AttandanceStatusChangeRequestDto
) => {
  await instance.post(`/teachers/status`, request.body);
};
