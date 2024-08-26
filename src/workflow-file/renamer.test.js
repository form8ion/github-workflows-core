import {promises as fs} from 'node:fs';

import any from '@travi/any';
import {describe, expect, it, vi} from 'vitest';

import renameWorkflowFile from './renamer.js';

vi.mock('node:fs');

describe('workflow file renamer', () => {
  it('should rename the workflow file in the workflows directory', async () => {
    const projectRoot = any.string();
    const oldName = any.word();
    const newName = any.word();

    await renameWorkflowFile({projectRoot, oldName, newName});

    expect(fs.rename).toHaveBeenCalledWith(
      `${projectRoot}/.github/workflows/${oldName}.yml`,
      `${projectRoot}/.github/workflows/${newName}.yml`
    );
  });
});
