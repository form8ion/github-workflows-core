import {assert} from 'chai';

import {checkout, installDependencies, executeVerification, setupNode} from './scaffolders.js';

suite('step scaffolders', () => {
  test('that the checkout step details are scaffolded', async () => {
    assert.deepEqual(checkout(), {uses: 'actions/checkout@v3.6.0'});
  });

  test('that node is set up correctly when version is determined from the `.nvmrc`', async () => {
    assert.deepEqual(
      setupNode({versionDeterminedBy: 'nvmrc'}),
      {name: 'Setup node', uses: 'actions/setup-node@v4.0.3', with: {'node-version-file': '.nvmrc', cache: 'npm'}}
    );
  });

  test('that node is set up correctly when the version is determined based on a matrix', async () => {
    assert.deepEqual(
      setupNode({versionDeterminedBy: 'matrix'}),
      {
        name: 'Setup node',
        uses: 'actions/setup-node@v4.0.3',
        // eslint-disable-next-line no-template-curly-in-string
        with: {'node-version': '${{ matrix.node }}', cache: 'npm'}
      }
    );
  });

  test('that dependencies are installed correctly', async () => {
    assert.deepEqual(installDependencies(), [{run: 'npm clean-install'}, {run: 'corepack npm audit signatures'}]);
  });

  test('that verification is executed correctly', async () => {
    assert.deepEqual(executeVerification(), {run: 'npm test'});
  });
});
