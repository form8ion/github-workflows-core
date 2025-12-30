import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import {removeActionFromSteps} from './remover.js';

describe('steps-level remover', () => {
  const anyStep = ({actionName} = {}) => ({
    ...any.simpleObject(),
    ...actionName && {uses: `${any.string()}${actionName}${any.string()}`}
  });

  it('should remove an action by name from a list of steps', async () => {
    const stepsBeforeRemoved = any.listOf(anyStep);
    const stepsAfterRemoved = any.listOf(anyStep);
    const actionName = any.word();
    const steps = [...stepsBeforeRemoved, anyStep({actionName}), ...stepsAfterRemoved];

    expect(removeActionFromSteps(steps, actionName)).toEqual([...stepsBeforeRemoved, ...stepsAfterRemoved]);
  });
});
