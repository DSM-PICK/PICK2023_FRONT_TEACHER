export interface StudentStatusType {
  student_id: string;
  type: string;
}

export interface GetAttendanceStatusRequestType {
  classRoom: string;
  type: string;
}

export interface AttandanceStatusChangeRequestType {
  classRoom: string;
  body: StudentStatusType;
}
