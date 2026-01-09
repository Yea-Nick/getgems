import { ReadApiService } from "./read-api";

export class GetGemsService {
    public readApi: ReadApiService;

    constructor() {
        this.readApi = new ReadApiService();
    }
}