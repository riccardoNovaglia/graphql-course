export async function loadJobs() {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          jobs {
            id
            title
            company {
              id
              name
            }
          }
        }
      `,
    }),
  });
  const {
    data: { jobs },
  } = await response.json();
  return jobs;
}
