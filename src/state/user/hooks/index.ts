import { useWeb3React } from "@web3-react/core";
import { ChainId } from "config/constants";
import useRefresh from "hooks/useRefresh";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "state";
import { fetchReferralUserDataAsync } from "../actions";
import { GAS_PRICE_GWEI } from "./helpers";

export function useGasPrice(): string {
  const chainId = process.env.REACT_APP_CHAIN_ID!;
  const userGas = useSelector<AppState, AppState["user"]["gasPrice"]>(
    (state) => state.user.gasPrice
  );
  return chainId === ChainId.MAINNET.toString()
    ? userGas
    : GAS_PRICE_GWEI.testnet;
}

export function useUsername(): string {
  const username = useSelector<AppState, AppState["user"]["username"]>(
    (state) => state.user.username 
  )
  return username;
}

export const usePollReferralUserData = () => {
  const dispatch = useAppDispatch();
  const { slowRefresh } = useRefresh();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      dispatch(fetchReferralUserDataAsync({ account }));
    }
  }, [dispatch, slowRefresh, account]);
}