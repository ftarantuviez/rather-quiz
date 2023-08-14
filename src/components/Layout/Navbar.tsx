"use client";

import type { FC } from "react";

import styles from "./Layout.module.scss";

import RatherLabsLogo from "../../../public/icons/RatherLabsLogo";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";
import useWalletContext from "@/hooks/useWalletContext";

export type TNavBarProps = {
  className?: string;
};

export const NavBar: FC<TNavBarProps> = ({ className }) => {
  const { activeAccount, isGoerliNetwork } = useWalletContext();

  return (
    <div className={`${styles.navbar} ${className}`}>
      <div className={styles.navbar__left}>
        <div className={styles.navbar__left__logoCont}>
          <RatherLabsLogo />
        </div>
      </div>
      <div className={styles.navbar__right}>
        {activeAccount && isGoerliNetwork && (
          <p className="text-white">455 QUIZ</p>
        )}
        {activeAccount && !isGoerliNetwork && (
          <p className="text-white">Switch network</p>
        )}
        {!activeAccount && <ConnectWalletButton />}
      </div>
    </div>
  );
};
