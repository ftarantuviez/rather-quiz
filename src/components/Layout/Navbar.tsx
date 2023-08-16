"use client";

import type { FC } from "react";

import styles from "./Layout.module.scss";
import { TbExchange } from "react-icons/tb";
import RatherLabsLogo from "../../../public/icons/RatherLabsLogo";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";
import useWalletContext from "@/hooks/useWalletContext";

export type TNavBarProps = {
  className?: string;
};

export const NavBar: FC<TNavBarProps> = ({ className }) => {
  const { activeAccount, isGoerliNetwork, quizBalance, switchNetworkToGoerli } =
    useWalletContext();

  return (
    <div className={`${styles.navbar} ${className}`}>
      <div className={styles.navbar__left}>
        <div className={styles.navbar__left__logoCont}>
          <RatherLabsLogo />
        </div>
      </div>
      <div className={styles.navbar__right}>
        {activeAccount && isGoerliNetwork && (
          <p className="text-white">{quizBalance} QUIZ</p>
        )}
        {activeAccount && !isGoerliNetwork && (
          <button
            className={styles.navbar__switchNetButton}
            onClick={switchNetworkToGoerli}
          >
            Switch network
            <TbExchange />
          </button>
        )}
        {!activeAccount && <ConnectWalletButton />}
      </div>
    </div>
  );
};
