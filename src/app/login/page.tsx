"use client";
import React from "react";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import useWalletContext from "@/hooks/useWalletContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "./Login.module.scss";

const Page = () => {
  const { activeAccount, loading } = useWalletContext();

  if (activeAccount) redirect("/");

  if (loading)
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        LOADING...
      </div>
    );
  return (
    <main className={styles.login}>
      <div className={styles.login__leftCont}>
        <h1 className={styles.login__title}>Solve your quiz</h1>
        <p className={styles.login__desc}>
          We have the funniest quizzes to solve. Please connect your
          Metamaskwallet to start solving them!
        </p>
        <ConnectWalletButton variant="contained" />
      </div>
      <div className={styles.login__rightCont}>
        <Image
          src="/images/loginBgImage.png"
          alt="Rather Labs"
          width={400}
          height={400}
        />
      </div>
    </main>
  );
};

export default Page;
