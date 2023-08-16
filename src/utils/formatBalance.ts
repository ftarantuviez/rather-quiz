import { ethers } from "ethers";

/**
 * Format the user's balance with 18 decimals
 * @param {number} balance - The balance that came from the ERC-20 Smart Contract
 * @returns a formatted balance
 */
export const formatBalance = (balance: string): string => {
  return ethers.formatUnits(balance, 18);
};
