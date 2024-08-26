// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {
  scaffoldCheckoutStep,
  scaffoldNodeSetupStep,
  scaffoldDependencyInstallationStep,
  scaffoldVerificationStep,
  loadWorkflowFile,
  writeWorkflowFile,
  workflowFileExists
} from './lib/index.js';

// remark-usage-ignore-next 4
stubbedFs({
  node_modules: stubbedFs.load('node_modules'),
  '.github': {workflows: {'existing-workflow-name.yml': 'foo: bar'}}
});

// #### Execute

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
