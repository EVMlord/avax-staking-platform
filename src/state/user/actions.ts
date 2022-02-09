import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkIfAccountExists } from 'utils/referralHelpers';

export const updateGasPrice = createAction<{ gasPrice: string }>('user/updateGasPrice');
export const updateUsername = createAction<{ username: string }>('user/updateUsername');
export const fetchReferralUserDataAsync = createAsyncThunk<
  {username: string},
  { account: string;}
>("farms/fetchReferralUserDataAsync", async ({ account }) => {
  
  const result = await checkIfAccountExists(account);
  if(result.status) {
    return {username: result.username}
  }
  return {username: ""}
});