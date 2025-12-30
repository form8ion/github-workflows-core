import {describe, it, expect, vi, beforeEach} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';
import zip from 'lodash.zip';

import {removeActionFromSteps} from '../steps/remover.js';
import {removeActionFromJobs} from './remover.js';

vi.mock('../steps/remover.js');

describe('jobs-level remover', () => {
  const actionName = any.word();
  const anySteps = () => any.listOf(any.simpleObject);
  const jobNames = any.listOf(any.word);
  const jobs = jobNames.map(() => ({...any.simpleObject(), steps: anySteps()}));
  const updatedJobs = jobs.map(job => ({...job, steps: anySteps()}));

  beforeEach(() => {
    zip(jobs, updatedJobs).forEach(([job, updatedJob]) => {
      when(removeActionFromSteps).calledWith(job.steps, actionName).thenReturn(updatedJob.steps);
    });
    when(removeActionFromSteps).calledWith(undefined, actionName).thenThrow(new Error());
  });

  it('should remove an action by name from an indexed list of jobs', async () => {
    expect(removeActionFromJobs(Object.fromEntries(zip(jobNames, jobs)), actionName))
      .toEqual(Object.fromEntries(zip(jobNames, updatedJobs)));
  });

  it('should not process `steps` for jobs defined as reusable workflows', async () => {
    const reusableWorkflowJobName = 'reusable-workflow';
    const reusableWorkflowJobDefinition = any.simpleObject();

    expect(removeActionFromJobs(
      Object.fromEntries(zip([...jobNames, reusableWorkflowJobName], [...jobs, reusableWorkflowJobDefinition])),
      actionName
    )).toEqual(
      Object.fromEntries(zip([...jobNames, reusableWorkflowJobName], [...updatedJobs, reusableWorkflowJobDefinition]))
    );
  });
});
