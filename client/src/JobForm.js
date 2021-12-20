import React from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { postNewJobMutation, updateJobCacheFn } from "./requests";

export function JobForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const {
      title: { value: titleValue },
      description: { value: descriptionValue },
    } = event.target;
    await postJob({
      variables: {
        newJob: { title: titleValue, description: descriptionValue },
      },
      update: updateJobCacheFn,
    });
  }
  const [postJob, { data, loading, error }] = useMutation(postNewJobMutation);

  if (error) return <h1>Whops, something didn't work</h1>;

  if (data?.job?.id) return <Redirect to={`/jobs/${data?.job?.id}`} />;

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" id="title" />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                id="description"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-link"
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
