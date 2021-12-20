import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { JobList } from "./JobList";
import { loadJobsQuery } from "./requests";

export function JobBoard() {
  const { data, loading, error } = useQuery(loadJobsQuery, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Whops, something didn't work</h1>;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={data.jobs} />
    </div>
  );
}
