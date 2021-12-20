import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, useParams } from "react-router-dom";
import { findJobQuery } from "./requests";

export function JobDetail() {
  const { jobId } = useParams();
  const { data, loading, error } = useQuery(findJobQuery, {
    variables: { id: jobId },
  });
  const job = data?.job;

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Whops, something didn't work</h1>;

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
}
