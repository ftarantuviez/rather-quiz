"use client";

import { createContext, FC, useEffect, useState } from "react";
import { WalletProviderProps, WalletProviderValues } from "./types";
import { GOERLI_HEX_ID, GOERLI_ID } from "@/constants/network";

export const WalletContext = createContext<WalletProviderValues>({
  activeAccount: "",
  loading: false,
  isGoerliNetwork: false,
  handleConnectWallet: () => {},
  switchNetworkToGoerli: () => {},
});

const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const [activeAccount, setActiveAccount] = useState("");
  const [isGoerliNetwork, setIsGoerliNetwork] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnectWallet = () => {
    const isMetaMask = isMetaMaskInstalled();
    if (isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => setActiveAccount(accounts[0]));
    } else {
      alert("Install metamask extension!!");
    }
  };

  const switchNetworkToGoerli = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: GOERLI_HEX_ID }],
      });
    } catch (error) {
      alert("There was an error trying to switch networks");
    }
  };

  const getAccounts = async () => {
    setLoading(true);
    try {
      const { ethereum } = window;
      const accounts = await ethereum?.request({ method: "eth_accounts" });
      setLoading(false);
      if (accounts.length > 0) {
        setActiveAccount(accounts[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const isGoerliNetworkActive = () => {
    return window.ethereum?.networkVersion === GOERLI_ID;
  };

  const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum?.isMetaMask);
  };

  useEffect(() => {
    getAccounts();
    const isUsingGoerli = isGoerliNetworkActive();
    if (isUsingGoerli) {
      setIsGoerliNetwork(true);
    }
  }, []);

  window.ethereum?.on("accountsChanged", async (accounts: string[]) => {
    if (accounts.length === 0) setActiveAccount("");
    else setActiveAccount(accounts[0]);
  });

  window.ethereum?.on("chainChanged", (chain: string) => {
    if (chain === GOERLI_HEX_ID) setIsGoerliNetwork(true);
    else setIsGoerliNetwork(false);
  });

  const values: WalletProviderValues = {
    activeAccount,
    loading,
    handleConnectWallet,
    switchNetworkToGoerli,
    isGoerliNetwork,
  };

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
