import { Home } from "@/components/home";
import { getArea } from "@/lib/action/getArea";
import { getJobCompany } from "@/lib/action/getJob";

export default async function Page() {
  const jobs = await getJobCompany();
  const areas = await getArea();
  return <Home jobs={jobs} areas={areas} />;
}
