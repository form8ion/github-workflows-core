import {fileTypes, writeConfigFile} from '@form8ion/core';

export default function ({projectRoot, name, config}) {
  return writeConfigFile({path: `${projectRoot}/.github/workflows`, name, config, format: fileTypes.YAML});
}
