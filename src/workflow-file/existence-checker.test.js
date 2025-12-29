import {fileExists} from '@form8ion/core';

import {when} from 'vitest-when';
import any from '@travi/any';
import {describe, expect, it, vi} from 'vitest';

import workflowFileExists from './existence-checker.js';

vi.mock('@form8ion/core');

describe('workflow existence checker', () => {
  it('should check for existence of the workflow file in the workflows directory', async () => {
    const projectRoot = any.string();
    const name = any.word();
    const exists = any.boolean();
    when(fileExists).calledWith(`${projectRoot}/.github/workflows/${name}.yml`).thenResolve(exists);

    expect(await workflowFileExists({projectRoot, name})).toBe(exists);
  });
});
