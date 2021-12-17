import React from "react";
import { postNewJob } from "./requests";
import { useHistory } from "react-router-dom";

export function JobForm() {
  const history = useHistory();
  async function handleSubmit(event) {
    event.preventDefault();
    const {
      title: { value: titleValue },
      description: { value: descriptionValue },
    } = event.target;
    const { id } = await postNewJob(titleValue, descriptionValue);
    history.push(`/jobs/${id}`);
  }

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
              <input type="submit" className="button is-link" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
