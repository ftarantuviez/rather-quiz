import React from "react";
import styles from "./ConnectWallet.module.scss";

type ConnectWalletButtonProps = {
  variant?: "contained";
};
const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { variant } = props;
  return (
    <button
      className={`${styles.connectWalletButton} ${
        variant === "contained" && styles.connectWalletButton__contained
      }`}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
