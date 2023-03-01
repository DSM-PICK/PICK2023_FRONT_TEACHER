import instance from "@/utils/axios";

interface GetDateTypeDto {
  date: string;
  type: string;
}

export const getDateType = async (request: string) => {
  const dateType = await instance.get<GetDateTypeDto>(
    `/admin/?date=${request}`
  );
  return dateType;
};
