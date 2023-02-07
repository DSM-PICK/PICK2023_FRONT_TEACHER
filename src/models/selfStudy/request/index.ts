export interface StudentStatusDto {
  student_id: string;
  type: string;
}

export interface GetAttendanceStatusRequestDto {
  classRoom: string;
  type: string;
}

export interface AttandanceStatusChangeRequestDto {
  classRoom: string;
  body: StudentStatusDto;
}
