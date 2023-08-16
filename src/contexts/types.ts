import { ReactNode } from "react";

export type WalletProviderValues = {
  handleConnectWallet: () => void;
  submitAnswers: (surveyId: number, answers: number[]) => void;
  switchNetworkToGoerli: () => void;
  quizBalance: string;
  isGoerliNetwork: boolean;
  activeAccount: string;
  loading: boolean;
};

export type WalletProviderProps = {
  children: ReactNode;
};
