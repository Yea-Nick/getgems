import fetch, { BodyInit } from "node-fetch";
import { EApiRequestMethod } from "../getgems.types";
import { FailedResponse, NftCollectionFullResponse } from "../getgems.schemas";

export class ReadApiService {
    private readonly READ_API_BASE_URL = 'https://api.getgems.io/public-api/v1';

    constructor(private readonly API_KEY: string) { }

    //Get NFT collection info
    async getNftCollectionInfo(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionFullResponse | FailedResponse>(EApiRequestMethod.GET, `collection/${collectionAddress}`);
    }

    //Get info about NFT by address. If there is no such NFT, you will receive error 404.
    async getNftByAddress(address: string): Promise<any> {
        return this.makeApiRequest(, `nft/${nft}`); //https://api.getgems.io/public-api/docs.json - ReadApi
    }

    //Get NFTs in specified collection
    getNftsInCollection(collectionId: string): Promise<any[]> { }

    //Get NFTs of specified address
    getNftsByAddress(address: string): Promise<any[]> { }

    //Get collection NFTs by specified owner address
    getCollectionNftsByOwner(ownerAddress: string): Promise<any[]> { }

    //Get Collection NFTs on sale
    getCollectionNftsOnSale(collectionId: string): Promise<any[]> { }

    //Get Collection offchain NFTs on sale
    getOffchainCollectionNftsOnSale(collectionId: string): Promise<any[]> { }

    //Get all offchain Telegram Gifts on sale
    getAllOffchainTelegramGiftsOnSale(): Promise<any[]> { }

    //Get NFTs by addresses
    getNftsByAddresses(addresses: string[]): Promise<any[]> { }

    //Get NFTs sorted by lastReindexAtCursor for incremental synchronization
    getNftsSortedByLastReindexCursor(cursor: string): Promise<any[]> { }

    //Get collection stats
    getCollectionStats(collectionId: string): Promise<any> { }

    //Get NFT history
    getNftHistory(nftId: string): Promise<any[]> { }

    //Get Collection history
    getCollectionHistory(collectionId: string): Promise<any[]> { }

    //Get Telegram Gifts history
    getTelegramGiftsHistory(): Promise<any[]> { }

    //Get Telegram Stickers history
    getTelegramStickersHistory(): Promise<any[]> { }

    //Create transaction to buy NFT on sale
    createBuyTransaction(nftId: string, price: number): Promise<any> { }

    //Create transaction to put up NFT for sale (fix price)
    createSellTransaction(nftId: string, price: number): Promise<any> { }

    //Get collection owners statistics
    getCollectionOwnersStats(collectionId: string): Promise<any> { }

    //Get collection owners top
    getCollectionOwnersTop(collectionId: string): Promise<any[]> { }

    //Get collection attributes
    getCollectionAttributes(collectionId: string): Promise<any> { }

    //NOT IMPLEMENTED. Get user NFTs in specified collection
    getUserNftsInCollection(userId: string, collectionId: string): Promise<any[]> { }

    //Get collection basic info data
    getCollectionBasicInfo(collectionId: string): Promise<any> { }

    //Reindex Nft collection metadata
    reindexNftCollectionMetadata(collectionId: string): Promise<any> { }

    //Reindex Nft metadata
    reindexNftMetadata(nftId: string): Promise<any> { }

    //Get user trading info
    getUserTradingInfo(userId: string): Promise<any> { }

    //Get gift collections
    getGiftCollections(): Promise<any[]> { }

    //Get sticker collections
    getStickerCollections(): Promise<any[]> { }

    //Check transaction status
    checkTransactionStatus(transactionId: string): Promise<any> { }

    //Get top collections
    getTopCollections(): Promise<any[]> { }

    //Get top gift collections
    getTopGiftCollections(): Promise<any[]> { }

    private async makeApiRequest<Response>(method: EApiRequestMethod, path: string, body?: BodyInit) {
        try {
            const res = await fetch(this.makeUrl(path), {
                method,
                body,
                headers: {
                    accept: 'application/json',
                    'Authorization': this.API_KEY
                }
            }).then(res => res.json() as Promise<Response>);

            return res;
        } catch (err) {
            throw new Error(`Make API reqeuest: ${err}`);
        }
    }

    private makeUrl(path: string) {
        return `${this.READ_API_BASE_URL}/${path}`;
    }
} 
