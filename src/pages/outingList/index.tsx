import OutList from "@/components/list";
import { useQuery } from "react-query";
import { getOutingStudentList } from "@/utils/api/outing";
import { useApiError } from "@/hooks/useApiError";
import { useState } from "react";

const OutingListPage = () => {
  const [arrayState, setArrayState] = useState<boolean>(false);

  const { handleError } = useApiError();
  const { data: outing } = useQuery(["outing"], () => getOutingStudentList(), {
    onSuccess: () => {
      if (Array.isArray(outing) && outing.length === 0) {
        setArrayState(true);
      }
      setArrayState(false);
    },
    onError: () => {
      setArrayState(false);
      handleError;
    },
  });

  return <OutList arrayState={arrayState} outing={outing?.data.outing || []} />;
};

export default OutingListPage;
