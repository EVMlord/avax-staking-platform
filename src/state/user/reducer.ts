import { createReducer } from '@reduxjs/toolkit';
import {
  fetchReferralUserDataAsync,
  updateGasPrice,
  updateUsername
} from './actions';

import { GAS_PRICE_GWEI } from './hooks/helpers';

export interface UserState {
  gasPrice: string;
  username: string;
}

export const initialState: UserState = {
  gasPrice: GAS_PRICE_GWEI.default,
  username: "",
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice
    })
    .addCase(updateUsername, (state, action) => {
      state.username = action.payload.username
    })
    // Update farms with live data
    .addCase(fetchReferralUserDataAsync.fulfilled, (state, action) => {
      state.username = action.payload.username
    })
)
