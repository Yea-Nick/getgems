import { MintingApiService } from "./minting-api";
import { ReadApiService } from "./read-api";

export class GetGemsService {
    public readApi: ReadApiService;
    public mintingApi: MintingApiService;

    constructor(apiKey: string) {
        this.readApi = new ReadApiService(apiKey);
        this.mintingApi = new MintingApiService(apiKey);
    }

    async test() {
        this.readApi.getNftsInCollection('');
    }
} 