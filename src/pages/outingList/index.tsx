import OutList from "@/components/list";
import { useQuery } from "react-query";
import { getOutingStudentList } from "@/utils/api/outing";

const OutingListPage = () => {
  const { data: outing } = useQuery("outing", () => getOutingStudentList());

  return <OutList outing={outing?.data.outing || []} />;
};

export default OutingListPage;
