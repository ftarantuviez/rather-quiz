import { ReactNode } from "react";

export type WalletProviderValues = {
  handleConnectWallet: () => void;
  switchNetworkToGoerli: () => void;
  isGoerliNetwork: boolean;
  activeAccount: string;
  loading: boolean;
};

export type WalletProviderProps = {
  children: ReactNode;
};
