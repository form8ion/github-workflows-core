import {fileTypes, loadConfigFile} from '@form8ion/core';

import {when} from 'jest-when';
import any from '@travi/any';
import {describe, expect, it, vi} from 'vitest';

import loadWorkflowFile from './loader.js';

vi.mock('@form8ion/core');

describe('workflow loader', () => {
  it('should load the workflow from the workflows directory', async () => {
    const projectRoot = any.string();
    const name = any.word();
    const workflowDetails = any.simpleObject();
    when(loadConfigFile)
      .calledWith({path: `${projectRoot}/.github/workflows`, name, format: fileTypes.YAML})
      .mockResolvedValue(workflowDetails);

    expect(await loadWorkflowFile({projectRoot, name})).toEqual(workflowDetails);
  });
});
