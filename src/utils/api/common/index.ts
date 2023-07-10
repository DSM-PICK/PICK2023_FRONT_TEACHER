import { GetMyClassResponseDto } from "@/models/common";
import instance from "@/utils/axios";

interface GetDateTypeDto {
  date: string;
  type: string;
}

export const getDateType = async (date: string) => {
  const dateType = await instance.get<GetDateTypeDto>(
    `/pick/admin/?date=${date}`
  );
  return dateType;
};

export const getMyClass = async () => {
  const response = await instance.get<GetMyClassResponseDto>(
    `/pick/teachers/buck`
  );
  return response.data;
};
