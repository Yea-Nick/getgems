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

## Data Structures

For the complete data structures and detailed API responses, refer to the [Getgems API Docs](https://api.getgems.io/public-api/docs).