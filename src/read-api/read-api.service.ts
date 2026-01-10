import { ApiService, EApiRequestMethod, AfterParameter, LimitParameter, MinTimeParameter, MaxTimeParameter, ECollectionsTopKind } from "../api-service";
import { BuyNftFixPriceRequest, CheckTxPayload, CollectionsTopResponse, DefaultErrorObject, EHistoryType, FailedResponse, NftCollectionAttributesResponse, NftCollectionFloorResponse, NftCollectionFullResponse, NftCollectionOwnersTopResponse, NftCollectionsFullResponse, NftCollectionStatsCountResponse, NftCollectionStatsResponse, NftItemFullResponse, NftItemHistoryResponse, NftItemsByAddressRequestBody, NftItemsFullNoCursorResponse, NftItemsFullResponse, NftItemsUpdateResponse, NftStickerCollectionsFullResponse, PutUpNftForSaleRequest, ReindexResponse, TonTxStatusResponse, TransactionResponse, UserTradingInfoResponse } from "../schemas";

export class ReadApiService extends ApiService {
    constructor(API_KEY: string) {
        super(API_KEY);
    }

    //Get NFT collection info
    async getCollectionByAddress(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/${collectionAddress}`,
        });
    }

    //Get info about NFT by address. If there is no such NFT, you will receive error 404.
    async getNftByAddress(nftAddress: string) {
        return this.makeApiRequest<NftItemFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nft/${nftAddress}`
        });
    }

    //Get NFTs in specified collection
    async getCollectionNfts(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/collection/${collectionAddress}`,
            queryParams
        });
    }

    //Get NFTs of specified address
    async getOwnerNfts(ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/owner/${ownerAddress}`,
            queryParams
        });
    };

    //Get collection NFTs by specified owner address
    async getCollectionOwnerNfts(collectionAddress: string, ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/collection/${collectionAddress}/owner/${ownerAddress}`,
            queryParams
        });
    };

    //Get Collection NFTs on sale
    async getNftsOnSale(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/on-sale/${collectionAddress}`,
            queryParams
        });
    };

    //Get Collection offchain NFTs on sale
    async getOffchainNftsOnSale(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/offchain/on-sale/${collectionAddress}`,
            queryParams
        });
    };

    //Get all offchain Telegram Gifts on sale
    async getOffchainGiftsOnSale(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | DefaultErrorObject>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/offchain/on-sale/gifts`,
            queryParams
        });
    };

    //Get NFTs by addresses
    async getNftsByAddresses(body: NftItemsByAddressRequestBody) {
        return this.makeApiRequest<NftItemsFullNoCursorResponse | DefaultErrorObject>({
            method: EApiRequestMethod.POST,
            path: `/v1/nfts/list`,
            body: JSON.stringify(body)
        });
    };

    //Get NFTs sorted by lastReindexAtCursor for incremental synchronization
    async getNftsUpdates(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsUpdateResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/updates`,
            queryParams
        });
    };

    //Get collection stats
    async getCollectionStats(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionStatsResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/stats/${collectionAddress}`
        });
    };

    //Get NFT history
    async getNftHistory(nftAddress: string, queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nft/history/${nftAddress}`,
            queryParams
        });
    };

    //Get Collection history
    async getNftCollectionHistory(collectionAddress: string, queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/history/${collectionAddress}`,
            queryParams
        });
    };

    //Get Telegram Gifts history
    async getGiftsHistory(queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/history/gifts`,
            queryParams
        });
    };

    //Get Telegram Stickers history
    async getStickersHistory(queryParams?: { minTime?: MinTimeParameter, maxTime?: MaxTimeParameter, after?: AfterParameter, limit?: LimitParameter, types?: EHistoryType[], reverse?: boolean; }) {
        return this.makeApiRequest<NftItemHistoryResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/nfts/history/stickers`,
            queryParams
        });
    };

    //Create transaction to buy NFT on sale
    async buyNftFixPrice(nftAddress: string, body: BuyNftFixPriceRequest) {
        return this.makeApiRequest<TransactionResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/nfts/buy-fix-price/${nftAddress}`,
            body: JSON.stringify(body)
        });
    };

    //Create transaction to put up NFT for sale (fix price)
    async putUpNftForSaleFixPrice(nftAddress: string, body: PutUpNftForSaleRequest) {
        return this.makeApiRequest<TransactionResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/nfts/put-on-sale-fix-price/${nftAddress}`,
            body: JSON.stringify(body)
        });
    };

    //Get collection owners statistics
    async getCollectionStatsCount(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionStatsCountResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/stats-count/${collectionAddress}`
        });
    };

    //Get collection owners top
    async getCollectionTopOwners(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftCollectionOwnersTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/top-owners/${collectionAddress}`,
            queryParams
        });
    };

    //Get collection attributes
    async getCollectionAttributes(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionAttributesResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/attributes/${collectionAddress}`
        });
    };

    //NOT IMPLEMENTED. Get user NFTs in specified collection
    //async userSearch() { };

    //Get collection basic info data
    async getCollectionBasicInfo(collectionAddress: string) {
        return this.makeApiRequest<NftCollectionFloorResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collection/basic-info/${collectionAddress}`
        });
    };

    //Reindex Nft collection metadata
    async reindexNftCollection(collectionAddress: string) {
        return this.makeApiRequest<ReindexResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/collection/reindex/${collectionAddress}`
        });
    };

    //Reindex Nft metadata
    async reindexNftItem(nftAddress: string) {
        return this.makeApiRequest<ReindexResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/nft/reindex/${nftAddress}`
        });
    };

    //Get user trading info
    async getUserTradingInfo(userAddress: string) {
        return this.makeApiRequest<UserTradingInfoResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/user-trading-info/${userAddress}`
        });
    };

    //Get gift collections
    async getGiftCollections(queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftCollectionsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/gifts/collections`,
            queryParams
        });
    };

    //Get sticker collections
    async getStickerCollections(queryParams: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftStickerCollectionsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/stickers/collections`,
            queryParams
        });
    };

    //Check transaction status
    async checkTxStatus(body: CheckTxPayload) {
        return this.makeApiRequest<TonTxStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/check-tx-status`,
            body: JSON.stringify(body)
        });
    };

    //Get top collections
    async getCollectionTop(queryParams?: { kind?: ECollectionsTopKind, after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<CollectionsTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/collections/top`,
            queryParams
        });
    };

    //Get top gift collections
    async getGiftTop(queryParams?: { kind?: ECollectionsTopKind, after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<CollectionsTopResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/gifts/collections/top`,
            queryParams
        });
    };
}