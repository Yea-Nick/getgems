import fetch from "node-fetch";

//TEMPORARY FROM READ_API!!!
import { ReadApiMakeApiRequest, ReadApiQueryParams } from "../read-api";
import { EApiRequestMethod } from "../getgems.types";
import { BatchMintingRequest, BatchMintingStatusResponse, CollectionUpdateRequest, CreateNewCollectionRequest, DefaultErrorObject, FailedResponse, MintingListResponse, MintingMessageResponse, MintingRequest, MintingStatusResponse, MintingWalletBalanceResponse, NftCollectionCreatingStatusResponse, NftItemResponse, NftItemsResponse, UpdateRequest, UpdateResponse, UploadResponse, V2BatchMintingRequest } from "../getgems.schemas";
import { AfterParameter, LimitParameter } from "../getgems.parameters";
//

export class MintingApiService {
    private readonly MINTING_API_BASE_URL = 'https://api.getgems.io/public-api/';

    constructor(private readonly API_KEY: string) { }

    async createMinting(collectionAddress: string, body: MintingRequest) {
        return this.makeApiRequest<MintingStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}`,
            body: JSON.stringify(body)
        });
    }

    async createBatchMinting(collectionAddress: string, body: BatchMintingRequest) {
        return this.makeApiRequest<BatchMintingStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/batch`,
            body: JSON.stringify(body)
        });
    }

    async v2CreateBatchMinting(collectionAddress: string, body: V2BatchMintingRequest) {
        return this.makeApiRequest<BatchMintingStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v2/minting/${collectionAddress}/batch`,
            body: JSON.stringify(body)
        });
    }

    async v2GetBatchStatus(collectionAddress: string, body: { requestIds: string[]; }) {
        return this.makeApiRequest<BatchMintingStatusResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v2/minting/${collectionAddress}/batch-status`,
            body: JSON.stringify(body)
        });
    }

    async mintingWalletBalance(collectionAddress: string) {
        return this.makeApiRequest<MintingWalletBalanceResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/wallet-balance`
        });
    }

    async mintingWalletRefund(collectionAddress: string, receiverAddress: string) {
        return this.makeApiRequest<MintingMessageResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/refund/${receiverAddress}`
        });
    }

    async mintingDeactivateApi(collectionAddress: string) {
        return this.makeApiRequest<MintingMessageResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/deactivate-api`
        });
    }

    async getStatus(collectionAddress: string, requestId: string) {
        return this.makeApiRequest<MintingStatusResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/${requestId}`
        });
    }

    async getMintingList(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter, reverse?: boolean; }) {
        return this.makeApiRequest<MintingListResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/list`,
            queryParams
        });
    }

    async createUpload(collectionAddress: string, fileName: string) {
        return this.makeApiRequest<UploadResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/create-upload/${collectionAddress}/${fileName}`
        });
    }

    async getNftByAddress(collectionAddress: string, nftAddress: string) {
        return this.makeApiRequest<NftItemResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nft/collection/by-address/${collectionAddress}/${nftAddress}`
        });
    }

    async getNftsInCollection(collectionAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nft/collection/items/${collectionAddress}`,
            queryParams
        });
    }

    async getUserNftsInCollection(collectionAddress: string, userAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `nft/collection/items/${collectionAddress}/${userAddress}`,
            queryParams
        });
    }

    async getUpdateNftStatus(collectionAddress: string, nftAddress: string) {
        return this.makeApiRequest<UpdateResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/update/${nftAddress}`
        });
    }

    async updateNft(collectionAddress: string, nftAddress: string, body: UpdateRequest) {
        return this.makeApiRequest<UpdateResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/update/${nftAddress}`,
            body: JSON.stringify(body)
        });
    }

    async newNftCollectionStatus(collectionAddress: string, requestId: string) {
        return this.makeApiRequest<NftCollectionCreatingStatusResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/new-collection/${requestId}`
        });
    }

    async createNewNftCollection(collectionAddress: string, body: CreateNewCollectionRequest) {
        return this.makeApiRequest<NftCollectionCreatingStatusResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/new-collection`,
            body: JSON.stringify(body)
        });
    }

    async updateNftCollection(collectionAddress: string, body: CollectionUpdateRequest) {
        return this.makeApiRequest<UpdateResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `minting/${collectionAddress}/update-collection`,
            body: JSON.stringify(body)
        });
    }

    async getUpdateNftCollectionStatus(collectionAddress: string, requestId: string) {
        return this.makeApiRequest<UpdateResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `minting/${collectionAddress}/update-collection/${requestId}`
        });
    }

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
        let url = `${this.MINTING_API_BASE_URL}/${path}`;
        if (queryParams) {
            url += `?${this.getQueryParams(queryParams)}`;
        }
        return url;
    }

    private getQueryParams(params: ReadApiQueryParams) {
        return new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, val]) => val !== undefined))).toString();
    }
}