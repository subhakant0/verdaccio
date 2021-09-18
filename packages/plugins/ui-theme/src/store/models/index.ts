import { Models } from '@rematch/core';

import { packages } from './packages';
export interface RootModel extends Models<RootModel> {
  packages: typeof packages;
}
export const models: RootModel = { packages };
