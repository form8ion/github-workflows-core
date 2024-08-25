// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {
  scaffoldCheckoutStep,
  scaffoldNodeSetupStep,
  scaffoldDependencyInstallationStep,
  scaffoldVerificationStep,
  writeWorkflowFile
} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs({node_modules: stubbedFs.load('node_modules'), '.github': {workflows: {}}});

// #### Execute

(async () => {
  scaffoldCheckoutStep();

  scaffoldNodeSetupStep({versionDeterminedBy: 'nvmrc'});

  scaffoldDependencyInstallationStep();

  scaffoldVerificationStep();

  await writeWorkflowFile({projectRoot: process.cwd(), name: 'workflow-name', config: {}});
})();
