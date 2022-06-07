import * as anchor from "@project-serum/anchor";
import { ProgramAccount, Wallet } from "@project-serum/anchor";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { Command } from "commander";
import { VoltVault, VoltVaultWithKey } from "./types";
import * as VoltIDLJsonRaw from "./volt.json";

const cli = new Command();

cli
  .version("1.0.0")
  .description("CLI tool for interacting w/ Friktion volts")
  .usage("[options]")
  .option(
    "-m, --match <string>",
    "set of characters to match volt address against"
  )
  .parse(process.argv);

(async () => {
  // set up provider and programs
  // process.env.ANCHOR_PROVIDER_URL = "https://api.mainnet-beta.solana.com";
  process.env.ANCHOR_PROVIDER_URL = "https://api.devnet.solana.com";
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as Wallet;
  anchor.setProvider(provider);

  const friktionProgram = new anchor.Program(
    VoltIDLJsonRaw as any,
    new PublicKey("VoLT1mJz1sbnxwq5Fv2SXjdVDgPXrb9tJyC8WpMDkSp"),
    provider
  );
  let voltVaults: VoltVaultWithKey[];
  const user = (wallet).payer;

  const options = cli.opts();
  if (!options.match) voltVaults = ((await friktionProgram?.account?.voltVault?.all()) as unknown as ProgramAccount<VoltVault>[])
    .map(
      (acct) => ({
        ...acct.account,
        voltKey: acct.publicKey,
      })
    );
  else {
    const temp = (await friktionProgram.account.voltVault?.fetch(new PublicKey(options.match as string))) as VoltVault;
    voltVaults = [
      {
        ...temp,
        voltKey: new PublicKey(options.match)
      }
    ]
  }


  console.log("match = ", options.match);
  for (const vv of voltVaults) {
    if (options.match !== undefined && !vv.voltKey.toString().includes(options.match)) {
      // console.log("skipping since does not match");
      continue;
    }

    console.log("volt: ", vv.voltKey.toString());

    console.log(
      "General Info\n --------------",
      "\n, underlying asset mint: ", vv.underlyingAssetMint.toString(),
      "\n, quote asset mint: ", vv.quoteAssetMint.toString()
    )

    const underlyingToken = new Token(
      provider.connection,
      vv.underlyingAssetMint,
      TOKEN_PROGRAM_ID,
      user
    );

    const vaultToken = new Token(
      provider.connection,
      vv.vaultMint,
      TOKEN_PROGRAM_ID,
      user
    );

    const quoteToken = new Token(
      provider.connection,
      vv.quoteAssetMint,
      TOKEN_PROGRAM_ID,
      user
    );

    const optionToken = new Token(
      provider.connection,
      vv.optionMint,
      TOKEN_PROGRAM_ID,
      user
    );

    const writerToken = new Token(
      provider.connection,
      vv.writerTokenMint,
      TOKEN_PROGRAM_ID,
      user
    );


  }
})()