import { AfterParameter, ApiService, EApiRequestMethod, LimitParameter } from "../api-service";
import { ConfirmTransferRequest, ConfirmTransferResponse, FailedResponse, GiftTransferRequest, NftItemsFullResponse, RequestTransferResponse, TransferOffchainGiftRequest, TransferResponse } from "../schemas";

export class GiftApiService extends ApiService {
    constructor(API_KEY: string) {
        super(API_KEY);
    }

    async transferOffchainGift(address: string, body: TransferOffchainGiftRequest) {
        return this.makeApiRequest<TransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/gifts/offchain/transfer/${address}`,
            body: JSON.stringify(body)
        });
    }

    async getCollectionOwnerOffchainGifts(collectionAddress: string, ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/gifts/offchain/${collectionAddress}/owner/${ownerAddress}`,
            queryParams
        });
    }

    async getOwnerOffchainGifts(ownerAddress: string, queryParams?: { after?: AfterParameter, limit?: LimitParameter; }) {
        return this.makeApiRequest<NftItemsFullResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/gifts/offchain/owner/${ownerAddress}`,
            queryParams
        });
    }

    async requestGiftTransfer(body: GiftTransferRequest) {
        return this.makeApiRequest<RequestTransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/gifts/request-transfer`,
            body: JSON.stringify(body)
        });
    }

    async confirmGiftTransfer(body: ConfirmTransferRequest) {
        return this.makeApiRequest<ConfirmTransferResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/gifts/confirm-transfer`,
            body: JSON.stringify(body)
        });
    }
}