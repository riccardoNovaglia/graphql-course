import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import { getAccessToken } from "./auth";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: "http://localhost:9000/graphql" }),
  ]),
  cache: new InMemoryCache(),
});

export async function loadJobs() {
  const query = gql`
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
  const { data } = await client.query({ query });
  return data.jobs;
}

export async function getJob(id) {
  const query = gql`
    query FindJob($id: ID!) {
      job(id: $id) {
        id
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
  const { data } = await client.query({ query, variables });
  return data.job;
}

export async function getCompany(id) {
  const query = gql`
    query FindCompany($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;
  const variables = { id };
  const { data } = await client.query({ query, variables });
  return data.company;
}

export async function getCompanyJobs(id) {
  const query = gql`
    query GetCompanyJobs($id: ID!) {
      company(id: $id) {
        id
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }
    }
  `;
  const variables = { id };
  const { data } = await client.query({ query, variables });
  return data.company.jobs;
}

export async function postNewJob(title, description) {
  const mutation = gql`
    mutation PostNewJob($newJob: CreateJobRequest) {
      job: createJob(newJob: $newJob) {
        id
      }
    }
  `;
  const variables = { newJob: { title, description } };
  const { data } = await client.mutate({ mutation, variables });
  return data.job;
}
