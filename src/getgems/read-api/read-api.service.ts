import fetch from "node-fetch";
import { EApiRequestMethod } from "../getgems.types";
import { BuyNftFixPriceRequest, CheckTxPayload, CollectionsTopResponse, DefaultErrorObject, EHistoryType, FailedResponse, NftCollectionAttributesResponse, NftCollectionFloorResponse, NftCollectionFullResponse, NftCollectionOwnersTopResponse, NftCollectionsFullResponse, NftCollectionStatsCountResponse, NftCollectionStatsResponse, NftItemFullResponse, NftItemHistoryResponse, NftItemsByAddressRequestBody, NftItemsFullNoCursorResponse, NftItemsFullResponse, NftItemsUpdateResponse, NftStickerCollectionsFullResponse, PutUpNftForSaleRequest, ReindexResponse, TonTxStatusResponse, TransactionResponse, UserTradingInfoResponse } from "../getgems.schemas";
import { AfterParameter, ECollectionsTopKind, LimitParameter, MaxTimeParameter, MinTimeParameter } from "../getgems.parameters";
import { ReadApiMakeApiRequest, ReadApiQueryParams } from ".";

export class ReadApiService {
    private readonly READ_API_BASE_URL = 'https://api.getgems.io/public-api/v1';

    constructor(private readonly API_KEY: string) { }

    //Get NFT collection info
    async getNftCollectionInfo(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/${collectionAddress}`,
        });
    }

    //Get info about NFT by address. If there is no such NFT, you will receive error 404.
    async getNftByAddress(nftAddress: string) {
        return this.makeApiRequest<NftItemFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nft/${nftAddress}`
        });
    }

    //Get NFTs in specified collection
    async getNftsInCollection(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/collection/${collectionAddress}`,
            queryParams
        });
    }

    //Get NFTs of specified address
    async getNftsByAddress(ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/owner/${ownerAddress}`,
            queryParams
        });
    };

    //Get collection NFTs by specified owner address
    async getCollectionNftsByOwner(collectionAddress: string, ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/collection/${collectionAddress}/owner/${ownerAddress}`,
            queryParams
        });
    };

    //Get Collection NFTs on sale
    async getCollectionNftsOnSale(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `nfts/on-sale/${collectionAddress}`,
            queryParams
        });
    };

    //Get Collection offchain NFTs on sale
    async getOffchainCollectionNftsOnSale(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `nfts/offchain/on-sale/${collectionAddress}`,
            queryParams
        });
    };

    //Get all offchain Telegram Gifts on sale
    async getAllOffchainTelegramGiftsOnSale(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `nfts/offchain/on-sale/gifts`,
            queryParams
        });
    };

    //Get NFTs by addresses
    async getNftsByAddresses(body: NftItemsByAddressRequestBody) {
        return this.makeApiRequest<NftItemsFullNoCursorResponse | DefaultErrorObject>({
            method: EApiRequestMethod.POST,
            path: `nfts/list`,
            body: JSON.stringify(body)
        });
    };

    //Get NFTs sorted by lastReindexAtCursor for incremental synchronization
    async getNftsSortedByLastReindexCursor(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsUpdateResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/updates`,
            queryParams
        });
    };

    //Get collection stats
    async getCollectionStats(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionStatsResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/stats/${collectionAddress}`
        });
    };

    //Get NFT history
    async getNftHistory(nftAddress: string, queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nft/history/${nftAddress}`,
            queryParams
        });
    };

    //Get Collection history
    async getCollectionHistory(collectionAddress: string, queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/history/${collectionAddress}`,
            queryParams
        });
    };

    //Get Telegram Gifts history
    async getTelegramGiftsHistory(queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/history/gifts`,
            queryParams
        });
    };

    //Get Telegram Stickers history
    async getTelegramStickersHistory(queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nfts/history/stickers`,
            queryParams
        });
    };

    //Create transaction to buy NFT on sale
    async createBuyTransaction(nftAddress: string, body: BuyNftFixPriceRequest) {
        return this.makeApiRequest<TransactionResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `nfts/buy-fix-price/${nftAddress}`,
            body: JSON.stringify(body)
        });
    };

    //Create transaction to put up NFT for sale (fix price)
    async createSellTransaction(nftAddress: string, body: PutUpNftForSaleRequest) {
        return this.makeApiRequest<TransactionResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `nfts/put-on-sale-fix-price/${nftAddress}`,
            body: JSON.stringify(body)
        });
    };

    //Get collection owners statistics
    async getCollectionOwnersStats(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionStatsCountResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/stats-count/${collectionAddress}`
        });
    };

    //Get collection owners top
    async getCollectionOwnersTop(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftCollectionOwnersTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/top-owners/${collectionAddress}`,
            queryParams
        });
    };

    //Get collection attributes
    async getCollectionAttributes(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionAttributesResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/attributes/${collectionAddress}`
        });
    };

    //NOT IMPLEMENTED. Get user NFTs in specified collection
    //async getUserNftsInCollection() { };

    //Get collection basic info data
    async getCollectionBasicInfo(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionFloorResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collection/basic-info/${collectionAddress}`
        });
    };

    //Reindex Nft collection metadata
    async reindexNftCollectionMetadata(collectionAddress: string) {
        return this.makeApiRequest<ReindexResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `collection/reindex/${collectionAddress}`
        });
    };

    //Reindex Nft metadata
    async reindexNftMetadata(nftAddress: string) {
        return this.makeApiRequest<ReindexResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `nft/reindex/${nftAddress}`
        });
    };

    //Get user trading info
    async getUserTradingInfo(userAddress: string) {
        return this.makeApiRequest<UserTradingInfoResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `user-trading-info/${userAddress}`
        });
    };

    //Get gift collections
    async getGiftCollections(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftCollectionsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `gifts/collections`,
            queryParams
        });
    };

    //Get sticker collections
    async getStickerCollections(queryParams: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftStickerCollectionsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `stickers/collections`,
            queryParams
        });
    };

    //Check transaction status
    async checkTransactionStatus(body: CheckTxPayload) {
        return this.makeApiRequest<TonTxStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `check-tx-status`,
            body: JSON.stringify(body)
        });
    };

    //Get top collections
    async getTopCollections(queryParams?: { kind?: ECollectionsTopKind, after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<CollectionsTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `collections/top`,
            queryParams
        });
    };

    //Get top gift collections
    async getTopGiftCollections(queryParams?: { kind?: ECollectionsTopKind, after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<CollectionsTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `gifts/collections/top`,
            queryParams
        });
    };

    private async makeApiRequest<Response>({ method, path, body, queryParams }: ReadApiMakeApiRequest) {
        try {
            const res = await fetch(this.makeUrl(path, queryParams), {
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

    private makeUrl(path: string, queryParams: ReadApiQueryParams | undefined) {
        let url = `${this.READ_API_BASE_URL}/${path}`;
        if (queryParams) {
            url += `?${this.getQueryParams(queryParams)}`;
        }
        return url;
    }

    private getQueryParams(params: ReadApiQueryParams) {
        return new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, val]) => val !== undefined))).toString();
    }
}