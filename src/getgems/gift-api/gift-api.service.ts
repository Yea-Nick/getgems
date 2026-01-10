import fetch from "node-fetch";

//TEMPORARY FROM READ_API!!!
import { ReadApiMakeApiRequest, ReadApiQueryParams } from "../read-api";
import { EApiRequestMethod } from "../getgems.types";
import { ConfirmTransferRequest, ConfirmTransferResponse, FailedResponse, GiftTransferRequest, NftItemsFullResponse, RequestTransferResponse, TransferOffchainGiftRequest, TransferResponse } from "../getgems.schemas";
import { AfterParameter, LimitParameter } from "../getgems.parameters";
//

export class GiftApiService {
    private readonly MINTING_API_BASE_URL = 'https://api.getgems.io/public-api/';

    constructor(private readonly API_KEY: string) { }

    async transferOffchainGift(address: string, body: TransferOffchainGiftRequest) {
        return this.makeApiRequest<TransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v1/gifts/offchain/transfer/${address}`,
            body: JSON.stringify(body)
        });
    }

    async getCollectionOwnerOffchainGifts(collectionAddress: string, ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `v1/gifts/offchain/${collectionAddress}/owner/${ownerAddress}`,
            queryParams
        });
    }

    async getOwnerOffchainGifts(ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `v1/gifts/offchain/owner/${ownerAddress}`,
            queryParams
        });
    }

    async requestGiftTransfer(body: GiftTransferRequest) {
        return this.makeApiRequest<RequestTransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v1/gifts/request-transfer`,
            body: JSON.stringify(body)
        });
    }

    async confirmGiftTransfer(body: ConfirmTransferRequest) {
        return this.makeApiRequest<ConfirmTransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v1/gifts/confirm-transfer`,
            body: JSON.stringify(body)
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