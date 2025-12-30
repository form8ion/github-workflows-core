import {removeActionFromSteps} from '../steps/remover.js';

export function removeActionFromJobs(jobs, actionName) {
  return Object.fromEntries(
    Object.entries(jobs).map(([jobName, job]) => ([
      jobName,
      {
        ...job,
        ...job.steps && {steps: removeActionFromSteps(job.steps, actionName)}
      }
    ]))
  );
}
