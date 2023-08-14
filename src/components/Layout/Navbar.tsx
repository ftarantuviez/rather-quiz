import type { FC } from "react";

import styles from "./Layout.module.scss";

import RatherLabsLogo from "../../../public/icons/RatherLabsLogo";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";

export type TNavBarProps = {
  className?: string;
};

export const NavBar: FC<TNavBarProps> = ({ className }) => {
  return (
    <div className={`${styles.navbar} ${className}`}>
      <div className={styles.navbar__left}>
        <div className={styles.navbar__left__logoCont}>
          <RatherLabsLogo />
        </div>
      </div>
      <div className={styles.navbar__right}>
        <ConnectWalletButton />
      </div>
    </div>
  );
};
