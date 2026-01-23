# Getgems NFT Marketplace API Client

**TypeScript SDK for interacting with the Getgems NFT Marketplace API.**

This package provides a convenient interface for working with the **Getgems** marketplace, supporting the ability to retrieve collection stats, manage NFTs, and more.

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

1. **ReadApi** – Retrieve Collection Floor Price, NFTs in Collection, and More
2. **MintingApi** – Create New NFTs and Collections via a Simple API
3. **cNFTApi** – For Large NFT Collections
4. **GiftApi** – This is a Special API for Partners Only
5. **StorageApi** – This is a Special API for Partners Only

To access the methods of these APIs, use the following properties of the created client class: `readApi`, `mintingApi`, `cNftApi`, `giftApi`, `storageApi`.

### Example:

```typescript
//Get collection attributes
const collectionAttributes = await client.readApi.getCollectionAttributes('collectionAddress');

//Create minting task
const mintingStatus = await client.mintingApi.createMinting('collectionAddress', mintingRequestBody);

//Add CNFT to collection
const addCNFTToCollectionResponse = await client.cNftApi.addCNFTToCollection('collectionAddress', cNFTRequestBody);

//Publicly unavailable. Get offchain gifts by specified owner address
const nftItems = await client.giftApi.getOwnerOffchainGifts('ownerAddress', queryParams);

//Publicly unavailable. Create box for storage
const storageBoxId = await client.storageApi.createStorage();
```

The method names correspond to the `operationId` values specified in the `paths/{path}/{httpRequestMethod}/operationId` for each endpoint, as outlined in [JSON file of the official API documentation](https://api.getgems.io/public-api/docs.json)

For full documentation of available methods for each API, please refer to the official [Getgems API Documentation](https://api.getgems.io/public-api/docs).

## Data Structures

If you require any of the Getgems API schema types (e.g., for forming request bodies), you can import them directly from `getgems`.

```typescript
import { DefaultErrorObject, NftItemFull } from 'getgems'
```