import { VoltSDK, ConnectedVoltSDK, FriktionSDK } from "../volt-sdk/src";
import * as anchor from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import Decimal from "decimal.js";

import { sendIns, wait } from "./utils";
import { ProviderLike } from "../volt-sdk/src/miscUtils";
import { Wallet } from "@project-serum/anchor";

const cli = new Command();

cli
  .version("1.0.0")
  .description("CLI tool for interacting w/ Friktion volts")
  .usage("[options]")
  .option("-i, --instruction <string>", "instruction to run")
  .option("-v, --volt <string>", "address of volt to send instructions for")
  .option(
    "--underlying-serum-market <string>",
    "serum market the underlying asset is trading on"
  )
  .option(
    "-d, --debug",
    "activate more debug messages. Can be set by env var DEBUG.",
    false
  )
  // deposit/withdraw
  .option("--amount <number>", "amount to deposit/withdraw")
  // print deposits
  .option("--pubkey <string>", "pubkey to print information for")
  .option("--all-volts", "print info for all volts")
  .parse(process.argv);

// set up provider and programs
process.env.ANCHOR_PROVIDER_URL = "https://api.mainnet-beta.solana.com";
// process.env.ANCHOR_PROVIDER_URL = "https://api.devnet.solana.com";
const provider = anchor.AnchorProvider.env();
const wallet = provider.wallet as Wallet;
anchor.setProvider(provider);

const user = (wallet).payer;
const connection = provider.connection;

const DELAY_MS = 5000;

const options = cli.opts();
const instruction = options.instruction;
const providerLike = {
  wallet,
  connection,
} as ProviderLike

const run = async () => {
  const fSdk = new FriktionSDK({
    provider: providerLike,
    network: "mainnet-beta",
    // network: "devnet",
  });

  const voltKey = new PublicKey(options.volt);
  const vv = await fSdk.loadVoltByKey(voltKey);
  const wallet = anchor.Wallet.local();

  const cSdk = new ConnectedVoltSDK(
    connection,
    wallet.publicKey,
    await fSdk.loadVoltByKey(voltKey),
    undefined
  );

  // Read only

  if (instruction === "printDeposits") {
    const pubkey = new PublicKey(options.pubkey);

    let voltsToPrint: VoltSDK[] = [];
    if (options.allVolts) {
      voltsToPrint = await fSdk.getAllVoltVaults();
    } else {
      voltsToPrint = [vv];
    }

    console.log(voltsToPrint);

    for (const voltSdk of voltsToPrint) {
      try {
        const structOrNull = await voltSdk.getBalancesForUser(pubkey);

        if (!structOrNull) {
          console.log("skipping...");
          continue;
        }

        const {
          totalBalance,
          normalBalance,
          pendingDeposits,
          pendingWithdrawals,
          mintableShares,
          claimableUnderlying,
          normFactor,
          vaultNormFactor,
        } = structOrNull;

        console.log("struct: ", structOrNull);
        if (totalBalance.gt(0)) {
          console.log("volt = ", voltSdk.voltKey.toString());

          console.log(
            "underlying mint = ",
            voltSdk.voltVault.underlyingAssetMint.toString()
          );
          console.log(
            "quote mint = ",
            voltSdk.voltVault.quoteAssetMint.toString()
          );

          console.log(
            "total balance: ",
            new Decimal(totalBalance.toString()).div(normFactor),
            "normal balance (from vault tokens): ",
            new Decimal(normalBalance.toString()).div(normFactor),
            "pending deposit balance: ",
            new Decimal(pendingDeposits.toString()).div(normFactor),
            "pending withdrawal balance: ",
            new Decimal(pendingWithdrawals.toString()).div(normFactor),
            "mintable shares: ",
            mintableShares.div(vaultNormFactor).toString(),
            "claimable underlying: ",
            claimableUnderlying.div(normFactor).toString()
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    return;
  }
};

(async () => {
  try {
    const text = await run();
    console.log(text);
  } catch (e) {
    console.log(e);
  }
})();
