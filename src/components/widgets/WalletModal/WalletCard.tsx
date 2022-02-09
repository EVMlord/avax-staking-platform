import React from "react";
import { ButtonProps } from "../../Button/Button";
import MoreHorizontal from "../../Svg/Icons/MoreHorizontal";
import { connectorLocalStorageKey, walletLocalStorageKey } from "./config";
import { Login, Config, ConnectorNames } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  isConnecting: boolean;
}

export const MoreWalletCard = (props: ButtonProps) => {
  return (
    <button {...props} className="flex items-center flex-col h-auto justify-center mx-auto w-full py-4">
      <MoreHorizontal className="w-10 mb-2 text-gray-200" />
      More
    </button>
  );
};

const WalletCard = ({ login, walletConfig, onDismiss, isConnecting }: Props) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <button
      className="flex items-center w-full flex-col h-auto justify-center mx-auto disabled:opacity-60
        disabled:cursor-not-allowed hover:text-primary-400 p-2 rounded-md hover:opacity-90
        hover:scale-110 transition-all duration-300"
      onClick={() => {
        // @ts-ignore
        const isIOS =/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        if (walletConfig.title === "Trust Wallet" && isIOS) {
          
          login(ConnectorNames.WalletConnect);
        } else {
          login(walletConfig.connectorId);
        }

        localStorage.setItem(walletLocalStorageKey, walletConfig.title);
        localStorage.setItem(
          connectorLocalStorageKey,
          walletConfig.connectorId
        );
        onDismiss();
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
      disabled={isConnecting}
    >
      <Icon width="60px" className="mb-1" />
      <div className="text-xs text-center">{title}</div>
    </button>
  );
};

export default WalletCard;
