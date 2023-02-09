import Start from "@/components/start";
import { useQuery } from "react-query";
import { getTodaySelfStudyTeacher } from "@/utils/api/selfStudy";

export default function Home() {
  const { data } = useQuery("postlist", () => getTodaySelfStudyTeacher());

  return (
    <>
      <Start
        fourth_floor={data?.data.fourth_floor!}
        second_floor={data?.data.second_floor!}
        third_floor={data?.data.third_floor!}
      />
    </>
  );
}
