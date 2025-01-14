import type * as anchor from "@project-serum/anchor";
import type { AnchorProvider } from "@project-serum/anchor";
import type {
  Commitment,
  PublicKey,
  Signer,
  TransactionInstruction,
  TransactionSignature,
} from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";

import type { FriktionSDK, OptionMarketWithKey } from "../../src";
import { VoltSDK } from "../../src";
import { makeAndSendTx, sleep } from "./sendTransactionHelpers";

export type TransactionMachineParams = {
  // keep sending txs
  blastAway?: boolean;
  blastInterval?: number;
  commitmentLevel?: Commitment;
  timeout?: number;
  signers?: Signer[];
};

class TransactionMachine {
  static BLAST_TIMEOUT = 250;
  readonly provider: AnchorProvider;
  blastAway: boolean | undefined;
  blastInterval: number | undefined;
  commitmentLevel: Commitment;
  signers: Signer[];
  timeout?: number;

  constructor(provider: AnchorProvider, params: TransactionMachineParams) {
    this.provider = provider;
    this.timeout = params.timeout;
    this.setBlastAway(params.blastAway ?? false, params.blastInterval ?? 500);
    this.commitmentLevel = params.commitmentLevel ?? "processed";
    this.signers = params.signers ?? [];
  }

  setBlastAway(shouldBlast: boolean, blastInterval: number) {
    if (shouldBlast) {
      this.blastAway = true;
      this.blastInterval = blastInterval;
      console.log(
        "modifying timeout to very long period since blasting requires this"
      );
      this.timeout;
    } else {
      this.blastAway = false;
      this.blastInterval = 0;
    }
  }

  async blastTx(
    insList: TransactionInstruction[],
    signers?: Signer[]
  ): Promise<TransactionSignature> {
    let txid: TransactionSignature | undefined = undefined;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const id = setInterval(async () => {
      try {
        const thisTxid = await this.sendInsList(insList, signers);
        txid = thisTxid;
      } catch (err) {
        const i = 1;
      }
    }, this.blastInterval);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (txid !== undefined) {
        clearInterval(id);
        return txid;
      }
      await sleep(500);
    }
  }

  async sendIns(
    ins: TransactionInstruction,
    signers?: Signer[]
  ): Promise<TransactionSignature> {
    if (this.blastAway) return await this.blastTx([ins], signers);
    return await sendIns(this.provider, ins, this.timeout);
  }

  async sendInsCatching(ins: TransactionInstruction): Promise<{
    success: boolean;
    error: unknown | undefined;
    txid: TransactionSignature | undefined;
  }> {
    // if (this.blastAway)
    return await sendInsCatching(this.provider, ins, this.timeout);
  }

  async sendInsList(
    insList: TransactionInstruction[],
    signers?: Signer[]
  ): Promise<TransactionSignature> {
    if (this.blastAway) return await this.blastTx(insList, signers);
    signers = signers?.concat(this.signers);
    return await sendInsList(this.provider, insList, signers, this.timeout);
  }

  async sendInsListCatching(
    insList: TransactionInstruction[],
    signers?: Signer[]
  ) {
    signers = signers?.concat(this.signers);
    await sendInsListCatching(this.provider, insList, signers, this.timeout);
  }
}

export const sendInsCatching = async (
  provider: anchor.AnchorProvider,
  ins: TransactionInstruction,
  timeout?: number
): Promise<{
  success: boolean;
  error: unknown | undefined;
  txid: TransactionSignature | undefined;
}> => {
  try {
    const txid = await sendIns(provider, ins, timeout);
    return {
      success: true,
      error: undefined,
      txid,
    };
  } catch (err) {
    console.log("error but fuck it");
    return {
      success: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      error: (err as Error).message,
      txid: undefined,
    };
  }
};

export const sendIns = async (
  provider: anchor.AnchorProvider,
  ins: TransactionInstruction,
  timeout?: number
): Promise<TransactionSignature> => {
  const tx = new Transaction();

  tx.add(ins);

  return await makeAndSendTx(
    provider.connection,
    (provider.wallet as anchor.Wallet).payer,
    tx,
    [],
    timeout
  );
};

export const sendInsListCatching = async (
  provider: anchor.AnchorProvider,
  insList: TransactionInstruction[],
  signers?: Signer[],
  timeout?: number
): Promise<{
  success: boolean;
  error: unknown | undefined;
  txid: TransactionSignature | undefined;
}> => {
  try {
    const txid = await sendInsList(provider, insList, signers, timeout);
    return {
      success: true,
      error: undefined,
      txid: txid,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
      txid: undefined,
    };
  }
};

export const sendInsList = async (
  provider: anchor.AnchorProvider,
  insList: TransactionInstruction[],
  signers?: Signer[],
  timeout?: number
): Promise<TransactionSignature> => {
  const tx = new Transaction();

  for (const ix of insList) {
    tx.add(ix);
  }

  return await makeAndSendTx(
    provider.connection,
    (provider.wallet as anchor.Wallet).payer,
    tx,
    signers ?? [],
    timeout
  );
};

export const initializeVoltWithoutOptionMarketSeed = async (
  provider: anchor.AnchorProvider,
  friktionSdk: FriktionSDK,
  quoteAssetMint: PublicKey,
  underlyingAssetMint: PublicKey,
  permissionedMarketPremiumMint: PublicKey,
  underlyingAmountPerContract: anchor.BN,
  // whitelistMintKey: PublicKey,
  vaultType: anchor.BN,
  transferTimeWindow: anchor.BN,
  expirationInterval: anchor.BN,
  upperBoundOtmStrikeFactor: anchor.BN,
  seed: PublicKey,
  capacity: anchor.BN,
  individualCapacity: anchor.BN,
  permissionlessAuctions: boolean
) => {
  const { instruction, voltKey } =
    await VoltSDK.initializeVoltWithoutOptionMarketSeed({
      sdk: friktionSdk,
      user: provider.wallet.publicKey,
      quoteAssetMint: quoteAssetMint,
      underlyingAssetMint: underlyingAssetMint,
      permissionedMarketPremiumMint: permissionedMarketPremiumMint,
      underlyingAmountPerContract: underlyingAmountPerContract,
      serumProgramId: friktionSdk.net.SERUM_DEX_PROGRAM_ID,
      transferTimeWindow: transferTimeWindow,
      expirationInterval: expirationInterval,
      upperBoundOtmStrikeFactor: upperBoundOtmStrikeFactor,
      seed: seed,
      capacity: capacity,
      individualCapacity: individualCapacity,
      permissionlessAuctions: permissionlessAuctions,
    });

  await sendIns(provider, instruction);

  return voltKey;
};

export const initializeVolt = async (
  provider: anchor.AnchorProvider,
  friktionSdk: FriktionSDK,
  optionMarket: OptionMarketWithKey,
  permissionedMarketPremiumMint: PublicKey,
  vaultType: anchor.BN,
  transferTimeWindow: anchor.BN,
  expirationInterval: anchor.BN,
  upperBoundOtmStrikeFactor: anchor.BN,
  seed: PublicKey,
  capacity: anchor.BN,
  individualCapacity: anchor.BN,
  permissionlessAuctions: boolean
) => {
  const { instruction, voltKey } = await VoltSDK.initializeVolt({
    sdk: friktionSdk,
    user: provider.wallet.publicKey,
    optionMarket: optionMarket,
    permissionedMarketPremiumMint: permissionedMarketPremiumMint,
    serumProgramId: friktionSdk.net.SERUM_DEX_PROGRAM_ID,
    transferTimeWindow: transferTimeWindow,
    expirationInterval: expirationInterval,
    upperBoundOtmStrikeFactor: upperBoundOtmStrikeFactor,
    seed: seed,
    capacity: capacity,
    individualCapacity: individualCapacity,
    permissionlessAuctions: permissionlessAuctions,
  });

  await sendIns(provider, instruction);

  return voltKey;
};
