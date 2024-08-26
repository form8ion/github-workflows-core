import {fileTypes, loadConfigFile} from '@form8ion/core';

export default function ({projectRoot, name}) {
  return loadConfigFile({path: `${projectRoot}/.github/workflows`, name, format: fileTypes.YAML});
}
