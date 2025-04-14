import {describe, expect, it} from 'vitest';

import {checkout, executeVerification, installDependencies, setupNode} from './scaffolders.js';

describe('step scaffolders', () => {
  it('should scaffold the details of the checkout step', () => {
    expect(checkout()).toEqual({uses: 'actions/checkout@v4.2.2'});
  });

  it('should set up node correctly when the version is determined from the `.nvmrc`', () => {
    expect(setupNode({versionDeterminedBy: 'nvmrc'})).toEqual({
      name: 'Setup node',
      uses: 'actions/setup-node@v4.4.0',
      with: {'node-version-file': '.nvmrc', cache: 'npm'}
    });
  });

  it('should set up node correctly when the version is determined based on a matrix', () => {
    expect(setupNode({versionDeterminedBy: 'matrix'})).toEqual({
      name: 'Setup node',
      uses: 'actions/setup-node@v4.4.0',
      // eslint-disable-next-line no-template-curly-in-string
      with: {'node-version': '${{ matrix.node }}', cache: 'npm'}
    });
  });

  it('should install dependencies correctly', () => {
    expect(installDependencies()).toEqual([
      {run: 'npm clean-install'},
      {run: 'npm install --global corepack@latest'},
      {run: 'corepack npm audit signatures'}
    ]);
  });

  it('should execute verification correctly', () => {
    expect(executeVerification()).toEqual({run: 'npm test'});
  });
});
