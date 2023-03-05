import Check from "@/components/check";
import { useQuery } from "react-query";
import { getChargeClass } from "@/utils/api/selfStudy";
import { useApiError } from "@/hooks/useApiError";

const CheckPage = () => {
  const { handleError } = useApiError();

  const { data: responsible_classroom_list } = useQuery(
    "classList",
    () => getChargeClass(),
    {
      onError: handleError,
    }
  );

  return (
    <Check
      floor={responsible_classroom_list?.data.floor!}
      responsible_classroom_list={
        responsible_classroom_list?.data.responsible_classroom_list || []
      }
    />
  );
};

export default CheckPage;
