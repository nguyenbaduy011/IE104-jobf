import JobInformationForm from "@/app/admin/jobs/createJob/jobInformationForm";
import { getCompany } from "@/lib/action/getCompany";

export default async function CreateJob() {
    const companies = await getCompany();
  
  return (
    <div>
      <JobInformationForm companies={companies}/>
    </div>
  );
}
