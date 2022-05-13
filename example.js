// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {
  scaffoldCheckoutStep,
  scaffoldNodeSetupStep,
  scaffoldDependencyInstallationStep,
  scaffoldVerificationStep
} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  scaffoldCheckoutStep();

  scaffoldNodeSetupStep({versionDeterminedBy: 'nvmrc'});

  scaffoldDependencyInstallationStep();

  scaffoldVerificationStep();
})();
