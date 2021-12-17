import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJob } from "./requests";

export function JobDetail() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  useEffect(() => {
    if (!jobId) return;

    async function getJobData() {
      const job = await getJob(jobId);
      setJob(job);
    }
    getJobData();
  }, [jobId]);

  if (job === undefined) {
    return <h1>Loading</h1>;
  }

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
