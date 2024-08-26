import {fileExists} from '@form8ion/core';

export default function ({projectRoot, name}) {
  return fileExists(`${projectRoot}/.github/workflows/${name}.yml`);
}
