<h1 align="center">Welcome to AJ's AMM 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/AJanovitch" target="_blank">
    <img alt="Twitter: AJanovitch" src="https://img.shields.io/twitter/follow/AJanovitch.svg?style=social" />
  </a>
</p>

> Swap, Deposit, and Withdraw from a liquidity pool comprising of two Tokens.

## Links

- 🏠 [Homepage](https://github.com/aaronjan98/AMM)
- ✨ [Live Demo](https://firzv-niaaa-aaaad-qe2rq-cai.ic.fleek.co/)
- [USD Token on goerli](https://goerli.etherscan.io/address/0xFfc2D05e40C3066A358F18D49a26D9DcfBa82cB9)
- [Le Token on goerli](https://goerli.etherscan.io/address/0xB055C28406722796E54A458b4A44D552cF963120)
- [AMM on goerli](https://goerli.etherscan.io/address/0x68BD04Bf18eA11ccC0aa536cdA86C9CE3B450861)

## Install

```sh
npm install
```

## Usage

- Run web server

```sh
npm run start
```

- Run local blockchain

```sh
npm run ganache
```

- Deploy Tokens and AMM contract

```sh
npx hardhat run scripts/deploy.js --network ganache
```

- Seed AMM with transactions to view reserve history chart

```sh
npx hardhat run scripts/seed.js --network ganache
```

- View hardhat/ganache accounts' Ether & token balances

```sh
npx hardhat run scripts/getBalances.js --network ganache
```

## Run tests

```sh
npx hardhat test test/AMM.js
```

## Author

👤 **aaronjanovitch@gmail.com**

- Website: aaronjanovitch.com
- Twitter: [@AJanovitch](https://twitter.com/AJanovitch)
- Github: [@aaronjan98](https://github.com/aaronjan98)
- LinkedIn: [@aaron-janovitch](https://linkedin.com/in/aaron-janovitch)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/aaronjan98/AMM/issues).

## Show your support

Give a ⭐️ if this project helped you!
