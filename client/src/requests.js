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

export const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({ uri: "http://localhost:9000/graphql" }),
  ]),
  cache: new InMemoryCache(),
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

export const findJobQuery = gql`
  query FindJob($id: ID!) {
    job(id: $id) {
      ...JobDetails
    }
  }
  ${jobDetailsFragment}
`;

export const loadJobsQuery = gql`
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

export const findCompanyQuery = gql`
  query FindCompany($id: ID!) {
    company(id: $id) {
      id
      name
      description
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

export const postNewJobMutation = gql`
  mutation PostNewJob($newJob: CreateJobRequest) {
    job: createJob(newJob: $newJob) {
      ...JobDetails
    }
  }
  ${jobDetailsFragment}
`;

export function updateJobCacheFn(cache, { data }) {
  cache.writeQuery({
    query: findJobQuery,
    variables: { id: data.job.id },
    data,
  });
}
