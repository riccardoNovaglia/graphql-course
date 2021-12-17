async function fetchGraphQL(query, variables = undefined) {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const { data } = await response.json();
  return data;
}

export async function loadJobs() {
  const query = `
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
  `;
  const data = await fetchGraphQL(query);
  return data.jobs;
}

export async function getJob(id) {
  const query = `
    query FindJob($id: ID!) {
      job(id: $id) {
        title
        description
        company {
          id
          name
        }
      }
    }
  `;
  const variables = { id };
  const data = await fetchGraphQL(query, variables);
  return data.job;
}

export async function getCompany(id) {
  const query = `
    query FindCompany($id: ID!) {
      company(id: $id) {
        name
        description
      }
    }
  `;
  const variables = { id };
  const data = await fetchGraphQL(query, variables);
  return data.company;
}

export async function getCompanyJobs(id) {
  const query = `
    query GetCompanyJobs($id:ID!) {
      company(id: $id){
        jobs {
          id
          title
          company {
            name
          }
        }
      }
    }
  `;
  const variables = { id };
  const data = await fetchGraphQL(query, variables);
  return data.company.jobs;
}
