/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, FC, useEffect, useState } from "react";
import { WalletProviderProps, WalletProviderValues } from "./types";
import { GOERLI_HEX_ID, GOERLI_ID } from "@/constants/network";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  QUIZ_TOKEN,
} from "@/constants/contract";
import { ethers, type Contract } from "ethers";
import { formatBalance } from "@/utils";

export const WalletContext = createContext<WalletProviderValues>({
  activeAccount: "",
  loading: false,
  isGoerliNetwork: false,
  quizBalance: "0",
  handleConnectWallet: () => {},
  switchNetworkToGoerli: () => {},
  submitAnswers: () => {},
});

const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const [activeAccount, setActiveAccount] = useState("");
  const [isGoerliNetwork, setIsGoerliNetwork] = useState(false);
  const [quizBalance, setQuizBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Contract>();

  const getContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setContract(contract);
  };

  const getQuizBalance = async () => {
    try {
      const balance = await contract?.balanceOf(activeAccount);
      setQuizBalance(formatBalance(balance));
    } catch (error) {
      throw error;
    }
  };

  const submitAnswers = async (surveyId: number, answers: number[]) => {
    setLoading(true);
    try {
      const tx = await contract?.submit(surveyId, answers);
      await tx.wait();
      await getQuizBalance();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("There was an error submiting the answers");
      console.log(error);
      throw error;
    }
  };

  const handleConnectWallet = () => {
    const isMetaMask = isMetaMaskInstalled();
    if (isMetaMask) {
      window?.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => setActiveAccount(accounts[0]));
    } else {
      alert("Install metamask extension!!");
    }
  };

  const switchNetworkToGoerli = async () => {
    try {
      await window?.ethereum?.request({
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
    return window?.ethereum?.networkVersion === GOERLI_ID;
  };

  const isMetaMaskInstalled = () => {
    return Boolean(window?.ethereum && window?.ethereum?.isMetaMask);
  };

  useEffect(() => {
    getAccounts();
    const isUsingGoerli = isGoerliNetworkActive();
    if (isUsingGoerli) {
      setIsGoerliNetwork(true);
    }
  }, []);

  useEffect(() => {
    if (activeAccount && isGoerliNetwork) {
      getContract();
    }
  }, [activeAccount, isGoerliNetwork]);

  useEffect(() => {
    if (activeAccount && contract && isGoerliNetwork) {
      getQuizBalance();
    }
  }, [activeAccount, contract, isGoerliNetwork]);

  if (typeof window !== "undefined") {
    window?.ethereum?.on("accountsChanged", async (accounts: string[]) => {
      if (accounts.length === 0) setActiveAccount("");
      else setActiveAccount(accounts[0]);
    });

    window?.ethereum?.on("chainChanged", (chain: string) => {
      if (chain === GOERLI_HEX_ID) setIsGoerliNetwork(true);
      else setIsGoerliNetwork(false);
    });
  }

  const values: WalletProviderValues = {
    activeAccount,
    loading,
    isGoerliNetwork,
    quizBalance,
    handleConnectWallet,
    switchNetworkToGoerli,
    submitAnswers,
  };

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
