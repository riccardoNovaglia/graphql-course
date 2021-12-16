import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

export function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getData() {
      const jobs = await loadJobs();
      setJobs(jobs);
    }
    getData();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
