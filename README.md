# Getgems NFT Marketplace API Client

**TypeScript SDK for interacting with the Getgems NFT Marketplace API.**

This package provides a convenient interface for working with the **Getgems** marketplace, supporting the ability to purchase, sell, and manage NFTs.

This npm package follows the structure and types as outlined in the official [Getgems API documentation](https://api.getgems.io/public-api/docs).

## Installation

To install the package, use npm:

```bash
npm install getgems
````

## Usage

### Initialize the Client

```typescript
import { Getgems } from 'getgems';

const client = new Getgems('your-api-key');
```

### Accessing APIs

The client provides access to the following APIs:

1. **readApi** – Methods for reading and fetching data from the Getgems marketplace.
2. **mintingApi** – Methods for minting new NFTs.
3. **cNftApi** – Methods for managing cNFTs (Certified NFTs).
4. **giftApi** – Methods for managing gift transactions.
5. **storageApi** – Methods for handling storage-related operations.

### Example:

```typescript
// Get data using the readApi
const collections = await client.readApi.getCollections();
const nftDetails = await client.readApi.getNFTDetails('nft-id');

// Mint a new NFT using the mintingApi
const mintResponse = await client.mintingApi.mintNFT(newNFTData);

// Handle cNFTs with the cNftApi
const cNFTDetails = await client.cNftApi.getCNFTDetails('cnft-id');
```

For full documentation of available methods for each API, please refer to the official [Getgems API Documentation](https://api.getgems.io/public-api/docs).

## API Methods Overview

Each of the available API categories has its own set of methods:

* **readApi**: Fetch data such as collections, NFTs, and marketplace listings.
* **mintingApi**: Interact with the minting process, including creating and listing new NFTs.
* **cNftApi**: Manage certified NFTs (cNFTs), which provide an extra layer of verification for assets.
* **giftApi**: Send and receive NFTs as gifts between users.
* **storageApi**: Handle NFT metadata storage and file management.

## Example Usage

Here are a few examples demonstrating how to interact with the different APIs:

### Fetching All Collections

```typescript
const collections = await client.readApi.getCollections();
console.log(collections);
```

### Minting a New NFT

```typescript
const mintResponse = await client.mintingApi.mintNFT({
  name: "My New NFT",
  description: "An awesome NFT",
  metadata: { /* metadata here */ }
});
console.log(mintResponse);
```

### Retrieving cNFT Details

```typescript
const cNFTDetails = await client.cNftApi.getCNFTDetails('some-cNFT-id');
console.log(cNFTDetails);
```

### Sending a Gift

```typescript
const giftResponse = await client.giftApi.sendNFTGift({
  recipient: 'recipient-user-id',
  nftId: 'nft-id-to-gift'
});
console.log(giftResponse);
```

## Data Structures

For the complete data structures and detailed API responses, refer to the [Getgems API Docs](https://api.getgems.io/public-api/docs).