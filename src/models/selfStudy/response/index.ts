export interface TodaySelfStudyTeacherDto {
  type: string;
  teacher: string[];
}

export interface ChargeClassDto {
  id: string;
  name: string;
}

export interface AttendanceStatusListDto {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}
