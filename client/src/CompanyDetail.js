import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompany, getCompanyJobs } from "./requests";
import { JobList } from "./JobList";

export function CompanyDetail() {
  const [company, setCompany] = useState();
  const [companyJobs, setCompanyJobs] = useState();
  const { companyId } = useParams();

  useEffect(() => {
    async function getCompanyData() {
      const company = await getCompany(companyId);
      setCompany(company);
    }
    async function getCompanyJobsData() {
      const jobs = await getCompanyJobs(companyId);
      setCompanyJobs(jobs);
    }
    getCompanyData();
    getCompanyJobsData();
  }, [companyId]);

  if (!company || !companyJobs) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="title is-1">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-2">Jobs at {company.name}</h2>
      <JobList jobs={companyJobs} />
    </div>
  );
}
