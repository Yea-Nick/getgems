import { ApiService, EApiRequestMethod } from "../api-service";
import { DefaultErrorObject, FailedResponse, SetStorageCollectionRequest, SetStorageCollectionResponse, StorageBoxIdResponse, StorageUploadCredentialsResponse } from "../schemas";

export class StorageApiService extends ApiService {
    constructor(API_KEY: string) {
        super(API_KEY);
    }

    async createStorage() {
        return this.makeApiRequest<StorageBoxIdResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `/v1/storage/upload-credentials`
        });
    }

    async getStorageCredentials(boxId: number) {
        return this.makeApiRequest<StorageUploadCredentialsResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `/v1/storage/upload-credentials/${boxId}`
        });
    }

    async setStorageCollection(boxId: number, body: SetStorageCollectionRequest) {
        return this.makeApiRequest<SetStorageCollectionResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.PATCH,
            path: `/v1/storage/upload-credentials/${boxId}`,
            body: JSON.stringify(body)
        });
    }
}