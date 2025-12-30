import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';
import zip from 'lodash.zip';

import {removeActionFromSteps} from '../steps/remover.js';
import {removeActionFromJobs} from './remover.js';

vi.mock('../steps/remover.js');

describe('jobs-level remover', () => {
  const anySteps = () => any.listOf(any.simpleObject);

  it('should remove an action by name from an indexed list of jobs', async () => {
    const actionName = any.word();
    const jobNames = any.listOf(any.word);
    const jobs = jobNames.map(() => ({...any.simpleObject(), steps: anySteps()}));
    const updatedJobs = jobs.map(job => ({...job, steps: anySteps()}));
    zip(jobs, updatedJobs).forEach(([job, updatedJob]) => {
      when(removeActionFromSteps).calledWith(job.steps, actionName).thenReturn(updatedJob.steps);
    });

    expect(removeActionFromJobs(Object.fromEntries(zip(jobNames, jobs)), actionName))
      .toEqual(Object.fromEntries(zip(jobNames, updatedJobs)));
  });
});
