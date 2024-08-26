# github-workflows-core

core functionality for form8ion plugins that manage github workflows

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [`scaffoldCheckoutStep`](#scaffoldcheckoutstep)
    * [`scaffoldNodeSetupStep`](#scaffoldnodesetupstep)
      * [`versionDeterminedBy` __string__ (_required_)](#versiondeterminedby-string-required)
    * [`scaffoldDependencyInstallationStep`](#scaffolddependencyinstallationstep)
    * [`scaffoldVerificationStep`](#scaffoldverificationstep)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/github-workflows-core on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/github-workflows-core --save-prod
```

### Example

#### Import

```javascript
import {
  scaffoldCheckoutStep,
  scaffoldNodeSetupStep,
  scaffoldDependencyInstallationStep,
  scaffoldVerificationStep,
  loadWorkflowFile,
  writeWorkflowFile,
  workflowFileExists
} from '@form8ion/github-workflows-core';
```

#### Execute

```javascript
const projectRoot = process.cwd();

(async () => {
  scaffoldCheckoutStep();

  scaffoldNodeSetupStep({versionDeterminedBy: 'nvmrc'});

  scaffoldDependencyInstallationStep();

  scaffoldVerificationStep();

  if (await workflowFileExists({projectRoot, name: 'existing-workflow-name'})) {
    await loadWorkflowFile({projectRoot, name: 'existing-workflow-name'});
  }

  await writeWorkflowFile({projectRoot, name: 'workflow-name', config: {}});
})();
```

### API

#### `scaffoldCheckoutStep`

Scaffolder to define the details for a step to check out the project in a
GitHub workflow

#### `scaffoldNodeSetupStep`

Scaffolder to define the details for a step to set up a node.js environment in
a GitHub workflow

Takes a single options object as an argument, containing:

##### `versionDeterminedBy` __string__ (_required_)

Source of node version for use in the configured step. Valid options are `nvmrc`
or `matrix`

#### `scaffoldDependencyInstallationStep`

Scaffolder to define the details for a step to install dependencies in a GitHub
workflow

#### `scaffoldVerificationStep`

Scaffolder to define the details for a step to execute verification

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![semantic-release: angular][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/form8ion/github-workflows-core/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/form8ion/github-workflows-core/node-ci.yml.svg?branch=master&logo=github

[coverage-link]: https://codecov.io/github/form8ion/github-workflows-core

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/github-workflows-core?logo=codecov

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/github-workflows-core.svg?logo=opensourceinitiative

[npm-link]: https://www.npmjs.com/package/@form8ion/github-workflows-core

[npm-badge]: https://img.shields.io/npm/v/@form8ion/github-workflows-core?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/github-workflows-core

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/github-workflows-core.svg

[node-badge]: https://img.shields.io/node/v/@form8ion/github-workflows-core?logo=node.js

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg
