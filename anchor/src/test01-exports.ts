// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import type { Test01 } from '../target/types/test01';
import { IDL as Test01IDL } from '../target/types/test01';

// Re-export the generated IDL and type
export { Test01, Test01IDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const TEST01_PROGRAM_ID = new PublicKey(
  '6p1a6Nq66DgLomDJWYSyqamaAyUe5FfQcdnhSXk41ieh'
);

// This is a helper function to get the program ID for the Test01 program depending on the cluster.
export function getTest01ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return TEST01_PROGRAM_ID;
  }
}
