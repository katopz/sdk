Setup:
> see: https://project-serum.github.io/anchor/tutorials/tutorial-0.html#generating-a-client
```
yarn
cd volt-abi
anchor build

cd ../simple-volt-manager
```

Steps:

1. `yarn print`, find the volt that haves mints matching w/ what you want
2. `yarn friktion -- --volt AkiyRN63QjUqa39tJ1wNhZv6NRdn17AVEvZj4VqCVFX -i deposit --amount 0.0000001`. Aki... is a devnet BTC covered call volt, this would deposit 1e-7 = one ten millionth of a bitcoin.
3. `yarn friktion -- --volt AkiyRN63QjUqa39tJ1wNhZv6NRdn17AVEvZj4VqCVFX -i withdraw --amount 0.0000001`. This would withdraw the same amount
4. `yarn friktion -- --volt AkiyRN63QjUqa39tJ1wNhZv6NRdn17AVEvZj4VqCVFX -i printDeposits --pubkey 9MjLr8vnepympPVPnDbkPeJ2GwQotqyhn5jwwSvqRJhF --all-volts`. print user balances info for all volts

Existing volts on mainnet:

- BTC covered calls: CdZ1Mgo3927bsYdKK5rnzGtwek3NLWdvoTSSm2TJjdqW
- SOL covered calls: CbPemKEEe7Y7YgBmYtFaZiECrVTP5sGrYzrrrviSewKY
- mSOL (marinade) covered calls: 9RcdLHX8rkfjo4ze2uyvhfQGjX6wAZtbvmBf3aK6wqrG
