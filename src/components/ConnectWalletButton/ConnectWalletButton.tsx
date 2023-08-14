"use client";
import React from "react";
import styles from "./ConnectWallet.module.scss";
import useWalletContext from "@/hooks/useWalletContext";

type ConnectWalletButtonProps = {
  variant?: "contained";
};
const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { variant } = props;
  const { handleConnectWallet } = useWalletContext();

  return (
    <button
      className={`${styles.connectWalletButton} ${
        variant === "contained" && styles.connectWalletButton__contained
      }`}
      onClick={handleConnectWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
