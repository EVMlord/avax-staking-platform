import React from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Qs from "qs";
import getFarmAdminUrl from "./getFarmAdminUrl";

export interface ReferralApiResponse {
  success: {
    data: {
      [key: string]: string;
    };
    message: string;
  };
  error: {
    data: any;
    message: string;
  };
}

interface RefFunctionReturn {
  message: string;
  status: boolean;
  data: { [key: string]: string };
}
export const addUserAndReferrer = async (
  address: string,
  refUsername: string
): Promise<RefFunctionReturn> => {
  const functionResponce = {
    message: "",
    status: false,
    data: { refUrl: "" },
  } as RefFunctionReturn;

  await axios({
    url:
      getFarmAdminUrl() +
      "?" +
      Qs.stringify({
        wallet_address: address,
        referrer: refUsername,
        action: "staked",
      }),
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  })
    .then((res) => {
      functionResponce.status = true;
      const response = res.data.success as ReferralApiResponse["success"];
      // Show alert
      if (response.data !== null) {
        functionResponce.message =
          "Good news! An additional 50,000 KRL has been reserved for referral rewards, invite your friends to join our farm and get extra rewards. Copy your unique referal link/ID below.";
        functionResponce.data.refUrl = response.data.refUrl;
      }
    })
    .catch((err: AxiosError) => {
      functionResponce.status = false;
      if (err.response) {
        const responce = err.response.data
          .error as ReferralApiResponse["error"];
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        functionResponce.message = responce.message;
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        functionResponce.message =
          "Some error occured, please check your internet connection or try again latter.";
      } else {
        // Something happened in setting up the request that triggered an Error
        functionResponce.message =
          "Something went wrong, please try again later.";
      }
    });

  return functionResponce;
};

export const getSiteUrl = () => process.env.REACT_APP_FRONTEND_URL || "https://kryptolite.rocks/stake";

export const checkIfAccountExists = async (
  account: string
): Promise<{
  username: string;
  status: boolean;
}> => {
  const functionResponce = {
    username: "",
    status: false,
  };

  await axios({
    url:
      getFarmAdminUrl() +
      "?" +
      Qs.stringify({
        q: account,
        action: "get",
      }),
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  })
    .then((res) => {
      functionResponce.status = true;
      const response = res.data.success as ReferralApiResponse["success"];
      // Show alert
      if (response.data.username) {
        functionResponce.username = response.data.username;
      }
    })
    .catch((err: AxiosError) => {
      functionResponce.status = false;
      functionResponce.username = "";
    });

  return functionResponce;
};

// A custom hook that builds on useLocation to parse
// the query string for you.
export default function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
