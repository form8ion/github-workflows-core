export function removeActionFromSteps(steps, actionName) {
  return steps.filter(step => !step.uses?.includes(actionName));
}
