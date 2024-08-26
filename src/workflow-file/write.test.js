import {fileTypes, writeConfigFile} from '@form8ion/core';

import any from '@travi/any';
import {describe, expect, it, vi} from 'vitest';

import writeWorkflowFile from './write.js';

vi.mock('@form8ion/core');

describe('workflow writer', () => {
  it('should write the workflow to the workflows directory as a yaml file', async () => {
    const projectRoot = any.string();
    const name = any.word();
    const config = any.simpleObject();

    await writeWorkflowFile({projectRoot, config, name});

    expect(writeConfigFile).toHaveBeenCalledWith({
      path: `${projectRoot}/.github/workflows`,
      name,
      config,
      format: fileTypes.YAML
    });
  });
});
