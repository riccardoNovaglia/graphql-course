import React from "react";
import { Link } from "react-router-dom";

export function JobList({ jobs }) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <Job job={job} key={job.id} />
      ))}
    </ul>
  );
}
function Job({ job }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  return (
    <li className="media">
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
    </li>
  );
}
