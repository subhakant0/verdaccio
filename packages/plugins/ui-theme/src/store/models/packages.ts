import { createModel } from '@rematch/core';
import { Package } from '@verdaccio/types';

import API from '../../providers/API/api';

import type { RootModel } from '.';

export const packages = createModel<RootModel>()({
  state: {
    packages: [] as Package[],
  },
  reducers: {
    savePackages(state, packages: Package[]) {
      return {
        ...state,
        packages,
      };
    },
  },
  effects: (dispatch) => ({
    async getPackages(payload: Package[]) {
      await API.request(`/-/verdaccio/packages`, 'GET');
      dispatch.packages.savePackages(payload);
    },
  }),
});
