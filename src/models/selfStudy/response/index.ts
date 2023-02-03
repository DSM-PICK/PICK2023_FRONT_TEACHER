export interface ITodaySelfStudyTeacher {
  type: string;
  teacher: string[];
}

export interface IChargeClass {
  id: string;
  name: string;
}

export interface IAttendanceStatusList {
  student_id: string;
  student_number: string;
  student_name: string;
  type: string;
  classroom_name: string | null;
}
