export type SimpleSwapIDL = {
  version: "0.1.0";
  name: "simple_swap";
  instructions: [
    {
      name: "create";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "userOrders";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapOrder";
          isMut: true;
          isSigner: false;
        },
        {
          name: "givePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "giveMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "receivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receiveMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "creatorGivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "counterparty";
          isMut: false;
          isSigner: false;
        },
        {
          name: "whitelistTokenMint";
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
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "giveSize";
          type: "u64";
        },
        {
          name: "receiveSize";
          type: "u64";
        },
        {
          name: "expiry";
          type: "u64";
        },
        {
          name: "isCounterpartyProvided";
          type: "bool";
        },
        {
          name: "isWhitelisted";
          type: "bool";
        }
      ];
      returns: "u64";
    },
    {
      name: "exec";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapOrder";
          isMut: true;
          isSigner: false;
        },
        {
          name: "givePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "counterpartyReceivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "counterpartyGivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "whitelistTokenAccount";
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
        }
      ];
      args: [];
    },
    {
      name: "cancel";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapOrder";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creatorGivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "givePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "claim";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapOrder";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creatorGivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creatorReceivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "givePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receivePool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "UserOrders";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "currOrderId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "SwapOrder";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "price";
            type: "f64";
          },
          {
            name: "expiry";
            type: "u64";
          },
          {
            name: "giveSize";
            type: "u64";
          },
          {
            name: "giveMint";
            type: "publicKey";
          },
          {
            name: "givePool";
            type: "publicKey";
          },
          {
            name: "receiveSize";
            type: "u64";
          },
          {
            name: "receiveMint";
            type: "publicKey";
          },
          {
            name: "receivePool";
            type: "publicKey";
          },
          {
            name: "isCounterpartyProvided";
            type: "bool";
          },
          {
            name: "counterparty";
            type: "publicKey";
          },
          {
            name: "isWhitelisted";
            type: "bool";
          },
          {
            name: "whitelistTokenMint";
            type: "publicKey";
          },
          {
            name: "isDisabled";
            type: "bool";
          },
          {
            name: "status";
            type: {
              defined: "OrderStatus";
            };
          },
          {
            name: "orderId";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "OrderStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Created";
          },
          {
            name: "Canceled";
          },
          {
            name: "Filled";
          },
          {
            name: "Disabled";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidCounterParty";
      msg: "invalid counter party";
    },
    {
      code: 6001;
      name: "InvalidGivePool";
      msg: "invalid give pool";
    },
    {
      code: 6002;
      name: "InvalidReceivePool";
      msg: "invalid receive pool";
    },
    {
      code: 6003;
      name: "CounterpartyMustBeSigner";
      msg: "counterparty must be signer";
    },
    {
      code: 6004;
      name: "SwapOrderWasFilled";
      msg: "swap order was filled";
    },
    {
      code: 6005;
      name: "SwapOrderWasCanceled";
      msg: "swap order was canceled";
    },
    {
      code: 6006;
      name: "SwapOrderIsDisabled";
      msg: "swap order is disabled";
    },
    {
      code: 6007;
      name: "SwapOrderHasExpired";
      msg: "swap order has expired";
    },
    {
      code: 6008;
      name: "SwapOrderMustBeDisabledToClose";
      msg: "swap order must be disabled to close";
    },
    {
      code: 6009;
      name: "OrderAlreadyFilled";
      msg: "order already filled";
    },
    {
      code: 6010;
      name: "OrderAlreadyCancelled";
      msg: "order already cancelled";
    },
    {
      code: 6011;
      name: "InvalidWhitelistTokenAccountMint";
      msg: "invalid whitelist token account mint";
    },
    {
      code: 6012;
      name: "MustHaveAtLeastOneMarketMakerAccessToken";
      msg: "min 1 mm token";
    },
    {
      code: 6013;
      name: "ReceivePoolMustBeEmpty";
      msg: "receive pool must be empty";
    },
    {
      code: 6014;
      name: "GivePoolMustBeEmpty";
      msg: "give pool must be empty";
    },
    {
      code: 6015;
      name: "OrderMustBeFilled";
      msg: "order must be filled";
    },
    {
      code: 6016;
      name: "OrderMustBeTrading";
      msg: "order must be trading";
    }
  ];
};
export const SimpleSwapIDLJsonRaw = {
  version: "0.1.0",
  name: "simple_swap",
  instructions: [
    {
      name: "create",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "userOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "givePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "giveMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receiveMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "creatorGivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "counterparty",
          isMut: false,
          isSigner: false,
        },
        {
          name: "whitelistTokenMint",
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
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "giveSize",
          type: "u64",
        },
        {
          name: "receiveSize",
          type: "u64",
        },
        {
          name: "expiry",
          type: "u64",
        },
        {
          name: "isCounterpartyProvided",
          type: "bool",
        },
        {
          name: "isWhitelisted",
          type: "bool",
        },
      ],
      returns: "u64",
    },
    {
      name: "exec",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "givePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "counterpartyReceivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "counterpartyGivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "whitelistTokenAccount",
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
      ],
      args: [],
    },
    {
      name: "cancel",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creatorGivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "givePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapOrder",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creatorGivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creatorReceivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "givePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receivePool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "UserOrders",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "currOrderId",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "SwapOrder",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "price",
            type: "f64",
          },
          {
            name: "expiry",
            type: "u64",
          },
          {
            name: "giveSize",
            type: "u64",
          },
          {
            name: "giveMint",
            type: "publicKey",
          },
          {
            name: "givePool",
            type: "publicKey",
          },
          {
            name: "receiveSize",
            type: "u64",
          },
          {
            name: "receiveMint",
            type: "publicKey",
          },
          {
            name: "receivePool",
            type: "publicKey",
          },
          {
            name: "isCounterpartyProvided",
            type: "bool",
          },
          {
            name: "counterparty",
            type: "publicKey",
          },
          {
            name: "isWhitelisted",
            type: "bool",
          },
          {
            name: "whitelistTokenMint",
            type: "publicKey",
          },
          {
            name: "isDisabled",
            type: "bool",
          },
          {
            name: "status",
            type: {
              defined: "OrderStatus",
            },
          },
          {
            name: "orderId",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "OrderStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Created",
          },
          {
            name: "Canceled",
          },
          {
            name: "Filled",
          },
          {
            name: "Disabled",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidCounterParty",
      msg: "invalid counter party",
    },
    {
      code: 6001,
      name: "InvalidGivePool",
      msg: "invalid give pool",
    },
    {
      code: 6002,
      name: "InvalidReceivePool",
      msg: "invalid receive pool",
    },
    {
      code: 6003,
      name: "CounterpartyMustBeSigner",
      msg: "counterparty must be signer",
    },
    {
      code: 6004,
      name: "SwapOrderWasFilled",
      msg: "swap order was filled",
    },
    {
      code: 6005,
      name: "SwapOrderWasCanceled",
      msg: "swap order was canceled",
    },
    {
      code: 6006,
      name: "SwapOrderIsDisabled",
      msg: "swap order is disabled",
    },
    {
      code: 6007,
      name: "SwapOrderHasExpired",
      msg: "swap order has expired",
    },
    {
      code: 6008,
      name: "SwapOrderMustBeDisabledToClose",
      msg: "swap order must be disabled to close",
    },
    {
      code: 6009,
      name: "OrderAlreadyFilled",
      msg: "order already filled",
    },
    {
      code: 6010,
      name: "OrderAlreadyCancelled",
      msg: "order already cancelled",
    },
    {
      code: 6011,
      name: "InvalidWhitelistTokenAccountMint",
      msg: "invalid whitelist token account mint",
    },
    {
      code: 6012,
      name: "MustHaveAtLeastOneMarketMakerAccessToken",
      msg: "min 1 mm token",
    },
    {
      code: 6013,
      name: "ReceivePoolMustBeEmpty",
      msg: "receive pool must be empty",
    },
    {
      code: 6014,
      name: "GivePoolMustBeEmpty",
      msg: "give pool must be empty",
    },
    {
      code: 6015,
      name: "OrderMustBeFilled",
      msg: "order must be filled",
    },
    {
      code: 6016,
      name: "OrderMustBeTrading",
      msg: "order must be trading",
    },
  ],
};
