import { Companies } from "@/components/companies";
import { getArea } from "@/lib/action/getArea";
import { getCompany } from "@/lib/action/getCompany";

export default async function Page() {
  const areas = await getArea();
  const companies = await getCompany();

  return <Companies  areas={areas} companies={companies}/>;
}
