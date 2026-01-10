import { ApiService, EApiRequestMethod } from "../api-service";
import { MintingWalletBalanceResponse, FailedResponse, MintingMessageResponse, AddCNFTToCollectionResponse, CNFTRequest, OpenCNFTResult, UploadResponse } from "../schemas";

export class CNFTApiService extends ApiService {
    constructor(API_KEY: string) {
        super(API_KEY);
    }

    async mintingWalletBalance(collectionAddress: string) {
        return this.makeApiRequest<MintingWalletBalanceResponse | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/minting/${collectionAddress}/wallet-balance`
        });
    }

    async mintingWalletRefund(collectionAddress: string, receiverAddress: string) {
        return this.makeApiRequest<MintingMessageResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/minting/${collectionAddress}/refund/${receiverAddress}`
        });
    }

    async mintingDeactivateApi(collectionAddress: string) {
        return this.makeApiRequest<MintingMessageResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/minting/${collectionAddress}/deactivate-api`
        });
    }

    async addCNFTToCollection(collectionAddress: string, body: CNFTRequest) {
        return this.makeApiRequest<AddCNFTToCollectionResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/cnft/${collectionAddress}/add-nft`,
            body: JSON.stringify(body)
        });
    }

    async openCNFTMintInCollection(collectionAddress: string) {
        return this.makeApiRequest<OpenCNFTResult | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/cnft/${collectionAddress}/open-minting`,
        });
    }

    async createCNFTUpload(collectionAddress: string, fileName: string) {
        return this.makeApiRequest<UploadResponse | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/cnft/create-upload/${collectionAddress}/${fileName}`,
        });
    }
}