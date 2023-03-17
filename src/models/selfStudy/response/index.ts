export interface TodaySelfStudyTeacher {
  date: string;
  name: string;
  floor: number[];
}

export interface TodaySelfStudyTeacherDto {
  second_floor: string;
  third_floor: string;
  fourth_floor: string;
}

export interface ChargeClassDto {
  id: string;
  name: string;
  description: string;
}

export interface GetClassList {
  floor: string;
  responsible_classroom_list: ChargeClassDto[];
}

export interface AttendanceStatusListDto {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}

export interface MovementStatusList {
  movement_student_list: AttendanceStatusListDto[];
}

export interface AttendanceStatusList {
  students: AttendanceStatusListDto[];
}
