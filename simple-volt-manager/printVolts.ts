import * as anchor from "@project-serum/anchor";
import { ProgramAccount, Wallet } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import Decimal from "decimal.js";
import { FriktionSDK, VoltSDK } from "../volt-sdk/src";
import { ProviderLike } from "../volt-sdk/src/miscUtils";
import { VoltVault, VoltVaultWithKey } from "./types";
import * as VoltIDLJsonRaw from "../volt-abi/target/idl/volt_abi.json";

const cli = new Command();

cli
  .version("1.0.0")
  .description("CLI tool for interacting w/ Friktion volts")
  .usage("[options]")
  .option(
    "-m, --match <string>",
    "set of characters to match volt address against"
  )
  .option("--pubkey <string>", "pubkey to print information for")
  .parse(process.argv);

(async () => {
  // set up provider and programs
  process.env.ANCHOR_PROVIDER_URL = "https://api.mainnet-beta.solana.com";
  // process.env.ANCHOR_PROVIDER_URL = "https://api.devnet.solana.com";
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as Wallet;
  anchor.setProvider(provider);

  const friktionProgram = new anchor.Program(
    VoltIDLJsonRaw as any,
    new PublicKey("VoLT1mJz1sbnxwq5Fv2SXjdVDgPXrb9tJyC8WpMDkSp"),
    provider
  );
  let voltVaults: VoltVaultWithKey[];

  const options = cli.opts();
  if (!options.match) {
    voltVaults = ((await friktionProgram?.account?.voltVault?.all()) as unknown as ProgramAccount<VoltVault>[])
      .map(
        (acct) => ({
          ...acct.account,
          voltKey: acct.publicKey,
        })
      );
  } else {
    const temp = (await friktionProgram.account.voltVault?.fetch(new PublicKey(options.match as string))) as VoltVault;
    voltVaults = [
      {
        ...temp,
        voltKey: new PublicKey(options.match)
      }
    ]
  }

  const connection = provider.connection;
  const pubkey = new PublicKey(options.pubkey);
  const providerLike = {
    wallet,
    connection,
  } as ProviderLike
  const fSdk = new FriktionSDK({
    provider: providerLike,
    network: "mainnet-beta",
    // network: "devnet",
  });

  // console.log("options.pubkey = ", options.pubkey);
  // console.log("match = ", options.match);
  const voltVault = voltVaults.find((v) => v.voltKey.toString() === options.match);
  // console.log("voltVault.voltKey = ", voltVault.voltKey.toBase58());
  const vv = await fSdk.loadVoltByKey(voltVault.voltKey);

  // console.log('voltVault:', JSON.stringify(voltVault, null, 2));
  // console.log('vv:', vv.voltKey.toString());


  let voltsToPrint: VoltSDK[] = [];
  if (options.allVolts) {
    voltsToPrint = await fSdk.getAllVoltVaults();
  } else {
    voltsToPrint = [vv];
  }

  for (const voltSdk of voltsToPrint) {
    try {
      const structOrNull = await voltSdk.getBalancesForUser(pubkey);

      if (!structOrNull) {
        // console.log("skipping...");
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

      console.log("user_balance: ", structOrNull);
      // if (totalBalance.gt(0)) {
      //   // console.log("volt = ", voltSdk.voltKey.toString());

      //   // console.log(
      //     "underlying mint = ",
      //     voltSdk.voltVault.underlyingAssetMint.toString()
      //   );
      //   // console.log(
      //     "quote mint = ",
      //     voltSdk.voltVault.quoteAssetMint.toString()
      //   );

      //   // console.log(
      //     "total balance: ",
      //     new Decimal(totalBalance.toString()).div(normFactor),
      //     "normal balance (from vault tokens): ",
      //     new Decimal(normalBalance.toString()).div(normFactor),
      //     "pending deposit balance: ",
      //     new Decimal(pendingDeposits.toString()).div(normFactor),
      //     "pending withdrawal balance: ",
      //     new Decimal(pendingWithdrawals.toString()).div(normFactor),
      //     "mintable shares: ",
      //     mintableShares.div(vaultNormFactor).toString(),
      //     "claimable underlying: ",
      //     claimableUnderlying.div(normFactor).toString()
      //   );
      // }
    } catch (err) {
      // console.log(err);
    }
  }
})()