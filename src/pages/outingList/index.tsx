import OutList from "@/components/list";
import { useQuery } from "react-query";
import { getOutingStudentList } from "@/utils/api/outing";
import { useApiError } from "@/hooks/useApiError";

const OutingListPage = () => {
  const { handleError } = useApiError();
  const { data: outing } = useQuery(["outing"], () => getOutingStudentList(), {
    onError: handleError,
  });

  return <OutList outing={outing?.data.outing || []} />;
};

export default OutingListPage;
