"use client";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import useWalletContext from "@/hooks/useWalletContext";
import Image from "next/image";

import React from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const { activeAccount, loading } = useWalletContext();

  if (activeAccount) redirect("/");

  if (loading) return <h1>LOADINF</h1>;
  return (
    <main className="flex h-[100vh] items-center justify-around p-24 text-white">
      <div className="w-[50%]">
        <h1 className="text-6xl font-[600] mb-8">Solve your quiz</h1>
        <p className="text-lg leading-8 mb-9">
          We have the funniest quizzes to solve. Please connect your
          Metamaskwallet to start solving them!
        </p>
        <ConnectWalletButton variant="contained" />
      </div>
      <div className="w-[50%] flex items-end justify-center">
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
