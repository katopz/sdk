export type SoloptionsIDL = {
  version: "0.1.0";
  name: "soloptions";
  instructions: [
    {
      name: "newContract";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "contract";
          isMut: true;
          isSigner: false;
        },
        {
          name: "writerMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "optionMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quotePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintFeeAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "exerciseFeeAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "underlyingAmount";
          type: "u64";
        },
        {
          name: "quoteAmount";
          type: "u64";
        },
        {
          name: "expiryTs";
          type: "u64";
        },
        {
          name: "contractBump";
          type: "u8";
        },
        {
          name: "optionBump";
          type: "u8";
        },
        {
          name: "writerBump";
          type: "u8";
        }
      ];
    },
    {
      name: "optionWrite";
      accounts: [
        {
          name: "writerAuthority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "contract";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userUnderlyingFundingTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "writerTokenDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "optionTokenDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "writerMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "optionMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "quoteMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "writeAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "optionExercise";
      accounts: [
        {
          name: "exerciserAuthority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "contract";
          isMut: false;
          isSigner: false;
        },
        {
          name: "quoteTokenSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "contractQuoteTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "optionMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "optionTokenSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "contractUnderlyingTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingTokenDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "quoteMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "numContracts";
          type: "u64";
        }
      ];
    },
    {
      name: "optionRedeem";
      accounts: [
        {
          name: "redeemerAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "contract";
          isMut: false;
          isSigner: false;
        },
        {
          name: "writerTokenSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "writerMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "contractUnderlyingTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "contractQuoteTokens";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingTokenDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTokenDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "underlyingMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "quoteMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "numContracts";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "OptionsContract";
      type: {
        kind: "struct";
        fields: [
          {
            name: "underlyingMint";
            type: "publicKey";
          },
          {
            name: "quoteMint";
            type: "publicKey";
          },
          {
            name: "expiryTs";
            type: "u64";
          },
          {
            name: "contractBump";
            type: "u8";
          },
          {
            name: "writerBump";
            type: "u8";
          },
          {
            name: "optionBump";
            type: "u8";
          },
          {
            name: "underlyingAmount";
            type: "u64";
          },
          {
            name: "quoteAmount";
            type: "u64";
          },
          {
            name: "writerMint";
            type: "publicKey";
          },
          {
            name: "optionMint";
            type: "publicKey";
          },
          {
            name: "underlyingPool";
            type: "publicKey";
          },
          {
            name: "quotePool";
            type: "publicKey";
          },
          {
            name: "mintFeeAccount";
            type: "publicKey";
          },
          {
            name: "exerciseFeeAccount";
            type: "publicKey";
          },
          {
            name: "extraKey1";
            type: "publicKey";
          },
          {
            name: "extraKey2";
            type: "publicKey";
          },
          {
            name: "extraInt1";
            type: "u64";
          },
          {
            name: "extraInt2";
            type: "u64";
          },
          {
            name: "extraBool";
            type: "bool";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "Unauthorized";
      msg: "Unauthorized.";
    },
    {
      code: 6001;
      name: "InvalidContractExpiry";
      msg: "Invalid contract expiry.";
    },
    {
      code: 6002;
      name: "ContractExpired";
      msg: "Options contract is expired.";
    },
    {
      code: 6003;
      name: "ContractNotYetExpired";
      msg: "Cannot redeem until contract expiry.";
    },
    {
      code: 6004;
      name: "InvalidMultiplier";
      msg: "Multiplier must be between 1 and 1000000";
    },
    {
      code: 6005;
      name: "InvalidFee";
      msg: "Invalid fee";
    },
    {
      code: 6006;
      name: "InvalidFeeOwner";
      msg: "Invalid fee owner";
    },
    {
      code: 6007;
      name: "InvalidQuoteTokenSource";
      msg: "invalid quote token source";
    },
    {
      code: 6008;
      name: "InvalidOptionTokenSource";
      msg: "invalid option token source";
    },
    {
      code: 6009;
      name: "InvalidWriterTokenSource";
      msg: "invalid writer token source";
    },
    {
      code: 6010;
      name: "InvalidWriterTokenDestination";
      msg: "invalid writer token destination";
    },
    {
      code: 6011;
      name: "InvalidUserUnderlyingTokens";
      msg: "invalid user underlying tokens";
    },
    {
      code: 6012;
      name: "InvalidUserQuoteTokens";
      msg: "invalid user quote tokens";
    },
    {
      code: 6013;
      name: "InvalidContractUnderlyingPool";
      msg: "invalid contract quote pool";
    },
    {
      code: 6014;
      name: "InvalidContractQuotePool";
      msg: "invalid contract quote pool";
    },
    {
      code: 6015;
      name: "InvalidOptionMint";
      msg: "invalid option mint";
    },
    {
      code: 6016;
      name: "InvalidWriterMint";
      msg: "invalid writer mint";
    },
    {
      code: 6017;
      name: "InvalidUnderlyingMint";
      msg: "invalid underlying mint";
    },
    {
      code: 6018;
      name: "InvalidQuoteMint";
      msg: "invalid quote mint";
    },
    {
      code: 6019;
      name: "InvalidUnderlyingOrQuoteAmount";
      msg: "invalid underlying or quote amount";
    },
    {
      code: 6020;
      name: "RoundUnderlyingTokensMintDoesNotMatchVoltVault";
      msg: "round underlying tokens does not match volt";
    },
    {
      code: 6021;
      name: "NotEnoughUnderlyingTokens";
      msg: "not enough underlying tokens";
    },
    {
      code: 6022;
      name: "NotEnoughWriterTokens";
      msg: "not enough writer tokens";
    },
    {
      code: 6023;
      name: "NotEnoughOptionTokens";
      msg: "not enough option tokens";
    },
    {
      code: 6024;
      name: "MustBeNonZeroRedemption";
      msg: "must be non zero # writer tokens being redeemed";
    },
    {
      code: 6025;
      name: "MustBeNonZeroWriteAmount";
      msg: "must be non zero write amount";
    },
    {
      code: 6026;
      name: "MustBeNonZeroExercise";
      msg: "must be non zero exercise";
    },
    {
      code: 6027;
      name: "NumberOverflow";
      msg: "number overflow";
    },
    {
      code: 6028;
      name: "TooEarlyToExerciseContract";
      msg: "too early to exercise contract";
    }
  ];
};
export const SoloptionsIDLJsonRaw = {
  version: "0.1.0",
  name: "soloptions",
  instructions: [
    {
      name: "newContract",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "contract",
          isMut: true,
          isSigner: false,
        },
        {
          name: "writerMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "optionMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quotePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintFeeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "exerciseFeeAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "underlyingAmount",
          type: "u64",
        },
        {
          name: "quoteAmount",
          type: "u64",
        },
        {
          name: "expiryTs",
          type: "u64",
        },
        {
          name: "contractBump",
          type: "u8",
        },
        {
          name: "optionBump",
          type: "u8",
        },
        {
          name: "writerBump",
          type: "u8",
        },
      ],
    },
    {
      name: "optionWrite",
      accounts: [
        {
          name: "writerAuthority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "contract",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userUnderlyingFundingTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "writerTokenDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "optionTokenDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "writerMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "optionMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "quoteMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "writeAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "optionExercise",
      accounts: [
        {
          name: "exerciserAuthority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "contract",
          isMut: false,
          isSigner: false,
        },
        {
          name: "quoteTokenSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "contractQuoteTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "optionMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "optionTokenSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "contractUnderlyingTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingTokenDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "quoteMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "numContracts",
          type: "u64",
        },
      ],
    },
    {
      name: "optionRedeem",
      accounts: [
        {
          name: "redeemerAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "contract",
          isMut: false,
          isSigner: false,
        },
        {
          name: "writerTokenSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "writerMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "contractUnderlyingTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "contractQuoteTokens",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingTokenDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTokenDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "underlyingMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "quoteMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "numContracts",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "OptionsContract",
      type: {
        kind: "struct",
        fields: [
          {
            name: "underlyingMint",
            type: "publicKey",
          },
          {
            name: "quoteMint",
            type: "publicKey",
          },
          {
            name: "expiryTs",
            type: "u64",
          },
          {
            name: "contractBump",
            type: "u8",
          },
          {
            name: "writerBump",
            type: "u8",
          },
          {
            name: "optionBump",
            type: "u8",
          },
          {
            name: "underlyingAmount",
            type: "u64",
          },
          {
            name: "quoteAmount",
            type: "u64",
          },
          {
            name: "writerMint",
            type: "publicKey",
          },
          {
            name: "optionMint",
            type: "publicKey",
          },
          {
            name: "underlyingPool",
            type: "publicKey",
          },
          {
            name: "quotePool",
            type: "publicKey",
          },
          {
            name: "mintFeeAccount",
            type: "publicKey",
          },
          {
            name: "exerciseFeeAccount",
            type: "publicKey",
          },
          {
            name: "extraKey1",
            type: "publicKey",
          },
          {
            name: "extraKey2",
            type: "publicKey",
          },
          {
            name: "extraInt1",
            type: "u64",
          },
          {
            name: "extraInt2",
            type: "u64",
          },
          {
            name: "extraBool",
            type: "bool",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Unauthorized",
      msg: "Unauthorized.",
    },
    {
      code: 6001,
      name: "InvalidContractExpiry",
      msg: "Invalid contract expiry.",
    },
    {
      code: 6002,
      name: "ContractExpired",
      msg: "Options contract is expired.",
    },
    {
      code: 6003,
      name: "ContractNotYetExpired",
      msg: "Cannot redeem until contract expiry.",
    },
    {
      code: 6004,
      name: "InvalidMultiplier",
      msg: "Multiplier must be between 1 and 1000000",
    },
    {
      code: 6005,
      name: "InvalidFee",
      msg: "Invalid fee",
    },
    {
      code: 6006,
      name: "InvalidFeeOwner",
      msg: "Invalid fee owner",
    },
    {
      code: 6007,
      name: "InvalidQuoteTokenSource",
      msg: "invalid quote token source",
    },
    {
      code: 6008,
      name: "InvalidOptionTokenSource",
      msg: "invalid option token source",
    },
    {
      code: 6009,
      name: "InvalidWriterTokenSource",
      msg: "invalid writer token source",
    },
    {
      code: 6010,
      name: "InvalidWriterTokenDestination",
      msg: "invalid writer token destination",
    },
    {
      code: 6011,
      name: "InvalidUserUnderlyingTokens",
      msg: "invalid user underlying tokens",
    },
    {
      code: 6012,
      name: "InvalidUserQuoteTokens",
      msg: "invalid user quote tokens",
    },
    {
      code: 6013,
      name: "InvalidContractUnderlyingPool",
      msg: "invalid contract quote pool",
    },
    {
      code: 6014,
      name: "InvalidContractQuotePool",
      msg: "invalid contract quote pool",
    },
    {
      code: 6015,
      name: "InvalidOptionMint",
      msg: "invalid option mint",
    },
    {
      code: 6016,
      name: "InvalidWriterMint",
      msg: "invalid writer mint",
    },
    {
      code: 6017,
      name: "InvalidUnderlyingMint",
      msg: "invalid underlying mint",
    },
    {
      code: 6018,
      name: "InvalidQuoteMint",
      msg: "invalid quote mint",
    },
    {
      code: 6019,
      name: "InvalidUnderlyingOrQuoteAmount",
      msg: "invalid underlying or quote amount",
    },
    {
      code: 6020,
      name: "RoundUnderlyingTokensMintDoesNotMatchVoltVault",
      msg: "round underlying tokens does not match volt",
    },
    {
      code: 6021,
      name: "NotEnoughUnderlyingTokens",
      msg: "not enough underlying tokens",
    },
    {
      code: 6022,
      name: "NotEnoughWriterTokens",
      msg: "not enough writer tokens",
    },
    {
      code: 6023,
      name: "NotEnoughOptionTokens",
      msg: "not enough option tokens",
    },
    {
      code: 6024,
      name: "MustBeNonZeroRedemption",
      msg: "must be non zero # writer tokens being redeemed",
    },
    {
      code: 6025,
      name: "MustBeNonZeroWriteAmount",
      msg: "must be non zero write amount",
    },
    {
      code: 6026,
      name: "MustBeNonZeroExercise",
      msg: "must be non zero exercise",
    },
    {
      code: 6027,
      name: "NumberOverflow",
      msg: "number overflow",
    },
    {
      code: 6028,
      name: "TooEarlyToExerciseContract",
      msg: "too early to exercise contract",
    },
  ],
};
