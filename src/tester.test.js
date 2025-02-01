import any from '@travi/any';
import {directoryExists} from '@form8ion/core';

import {it, expect, describe, vi} from 'vitest';
import {when} from 'jest-when';

import projectUsesGithubWorkflows from './tester.js';

vi.mock('@form8ion/core');

describe('workflows predicate', () => {
  const projectRoot = any.string();

  it('should return `true` when the project uses GitHub workflows', async () => {
    when(directoryExists).calledWith(`${projectRoot}/.github/workflows`).mockResolvedValue(true);

    expect(await projectUsesGithubWorkflows({projectRoot})).toEqual(true);
  });

  it('should return `false` when the project does not use GitHub workflows', async () => {
    when(directoryExists).calledWith(`${projectRoot}/.github/workflows`).mockResolvedValue(false);

    expect(await projectUsesGithubWorkflows({projectRoot})).toEqual(false);
  });
});
