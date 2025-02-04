# Token Presale Project

## Overview

This project consists of a simple ERC20 token contract and a presale contract for the token. The presale allows users to purchase tokens at a fixed rate using Ether. The frontend is built with React to provide an interface for users to participate in the presale.

## 🔗 [![](https://img.shields.io/badge/token_presale_v1-vercel_app-red)](https://token-presale-v1.vercel.app/)

## Contracts

### SimpleToken

The `SimpleToken` contract is an ERC20 token with a fixed initial supply. It uses OpenZeppelin's `ERC20PresetMinterPauser` for standard ERC20 functionality.

#### Key Features:
- Initial supply is minted to the deployer's address.
- Decimals can be set during deployment.

### Presale

The `Presale` contract allows users to purchase `SimpleToken` tokens at a rate of 1000 tokens per 1 ETH.

#### Key Features:
- Users can buy tokens by sending Ether to the contract.
- The Ether received is transferred to the owner's address.
- Tracks the total amount of Ether raised.

## Frontend

The frontend is built using React and provides a user interface for participating in the token presale.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Truffle or Hardhat (for deploying contracts)
- MetaMask (for interacting with the contracts)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamyourdre/Token-Presale-V1.git
   cd Token-Presale-V1
