import { ReadApiService } from "./read-api";
import { MintingApiService } from "./minting-api";
import { CNFTApiService } from "./cnft-api";
import { GiftApiService } from "./gift-api";
import { StorageApiService } from "./storage-api";

class GetgemsService {
    public readApi: ReadApiService;
    public mintingApi: MintingApiService;
    public cNftApi: CNFTApiService;
    public giftApi: GiftApiService;
    public storageApi: StorageApiService;

    constructor(apiKey: string) {
        this.readApi = new ReadApiService(apiKey);
        this.mintingApi = new MintingApiService(apiKey);
        this.cNftApi = new CNFTApiService(apiKey);
        this.giftApi = new GiftApiService(apiKey);
        this.storageApi = new StorageApiService(apiKey);
    }
}

export { GetgemsService as Getgems };