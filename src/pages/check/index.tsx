import Check from "@/components/check";
import { useQuery } from "react-query";
import { getChargeClass } from "@/utils/api/selfStudy";

const CheckPage = () => {
  const { data: classroom_List } = useQuery("classList", () =>
    getChargeClass()
  );

  return <Check classroom_List={classroom_List?.data.classroom_list || []} />;
};

export default CheckPage;
