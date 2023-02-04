export interface TodaySelfStudyTeacherType {
  type: string;
  teacher: string[];
}

export interface ChargeClassType {
  id: string;
  name: string;
}

export interface AttendanceStatusListType {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}
