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
  classroom_list: ChargeClassDto[];
}

export interface AttendanceStatusListDto {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}

export interface AttendanceStatudList {
  student: AttendanceStatusListDto[];
}
