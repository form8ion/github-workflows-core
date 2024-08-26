import {promises as fs} from 'node:fs';

export default function ({projectRoot, oldName, newName}) {
  return fs.rename(
    `${projectRoot}/.github/workflows/${oldName}.yml`,
    `${projectRoot}/.github/workflows/${newName}.yml`
  );
}
