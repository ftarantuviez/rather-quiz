/* eslint-disable import/no-anonymous-default-export */
import { useContext } from "react";

import { WalletProviderValues } from "@/contexts/types";
import { WalletContext } from "@/contexts/WalletContext";

export default () => useContext<WalletProviderValues>(WalletContext);
