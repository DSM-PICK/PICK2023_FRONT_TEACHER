export interface StudentStatusDto {
  student_id: string;
  type: string;
}

export interface AttandanceStatusChangeRequestDto {
  period: number;
  user_id: string;
  status: string;
}
