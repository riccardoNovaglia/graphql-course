import React from "react";
import { useParams } from "react-router-dom";
import { findCompanyQuery } from "./requests";
import { JobList } from "./JobList";
import { useQuery } from "@apollo/react-hooks";

export function CompanyDetail() {
  const { companyId } = useParams();
  const { data, loading, error } = useQuery(findCompanyQuery, {
    variables: { id: companyId },
  });
  const company = data?.company;
  const companyJobs = company?.jobs || [];

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Whops, something didn't work</h1>;

  return (
    <div>
      <h1 className="title is-1">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-2">Jobs at {company.name}</h2>
      <JobList jobs={companyJobs} />
    </div>
  );
}
