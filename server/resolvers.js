const db = require("./db");

const Query = {
  job: (parent, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
  company: (parent, args) => db.companies.get(args.id),
};

const Mutation = {
  createJob: (parent, { newJob }, { user }) => {
    if (!user) {
      throw new Error("you gotta authenticate");
    }
    const { companyId } = db.users.get(user.sub);
    const newJobId = db.jobs.create({ ...newJob, companyId });
    return db.jobs.get(newJobId);
  },
};

const Job = {
  company: (parent) => db.companies.get(parent.companyId),
};

const Company = {
  jobs: (parent) => db.jobs.list().filter((job) => job.companyId === parent.id),
};

module.exports = { Company, Job, Query, Mutation };
