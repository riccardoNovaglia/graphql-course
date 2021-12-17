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

const jobDetailsFragment = gql`
  fragment JobDetails on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

const findJobQuery = gql`
  query FindJob($id: ID!) {
    job(id: $id) {
      ...JobDetails
    }
  }
  ${jobDetailsFragment}
`;

const loadJobsQuery = gql`
  query LoadJobs {
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

const findCompanyQuery = gql`
  query FindCompany($id: ID!) {
    company(id: $id) {
      id
      name
      description
    }
  }
`;

const getCompanyJobsQuery = gql`
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

const postNewJobMutation = gql`
  mutation PostNewJob($newJob: CreateJobRequest) {
    job: createJob(newJob: $newJob) {
      ...JobDetails
    }
  }
  ${jobDetailsFragment}
`;

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: "http://localhost:9000/graphql" }),
  ]),
  cache: new InMemoryCache(),
});

export async function loadJobs() {
  const { data } = await client.query({
    query: loadJobsQuery,
    fetchPolicy: "no-cache",
  });
  return data.jobs;
}

export async function getJob(id) {
  const { data } = await client.query({
    query: findJobQuery,
    variables: { id },
  });
  return data.job;
}

export async function getCompany(id) {
  const { data } = await client.query({
    query: findCompanyQuery,
    variables: { id },
  });
  return data.company;
}

export async function getCompanyJobs(id) {
  const { data } = await client.query({
    query: getCompanyJobsQuery,
    variables: { id },
  });
  return data.company.jobs;
}

export async function postNewJob(title, description) {
  const variables = { newJob: { title, description } };
  const { data } = await client.mutate({
    mutation: postNewJobMutation,
    variables,
    update: (cache, { data }) => {
      cache.writeQuery({
        query: findJobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return data.job;
}
