import fetch from "node-fetch";

//TEMPORARY FROM READ_API!!!
import { ReadApiMakeApiRequest, ReadApiQueryParams } from "../read-api";
import { EApiRequestMethod } from "../getgems.types";
import { DefaultErrorObject, FailedResponse, SetStorageCollectionRequest, SetStorageCollectionResponse, StorageBoxIdResponse, StorageUploadCredentialsResponse } from "../getgems.schemas";
//

export class StorageApiService {
    private readonly MINTING_API_BASE_URL = 'https://api.getgems.io/public-api/';

    constructor(private readonly API_KEY: string) { }

    async createStorage() {
        return this.makeApiRequest<StorageBoxIdResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.POST,
            path: `v1/storage/upload-credentials`
        });
    }

    async getStorageCredentials(boxId: number) {
        return this.makeApiRequest<StorageUploadCredentialsResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.GET,
            path: `v1/storage/upload-credentials/${boxId}`
        });
    }

    async setStorageCollection(boxId: number, body: SetStorageCollectionRequest) {
        return this.makeApiRequest<SetStorageCollectionResponse | DefaultErrorObject | FailedResponse>({
            method: EApiRequestMethod.PATCH,
            path: `v1/storage/upload-credentials/${boxId}`,
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