import fetch from "node-fetch";
import { ApiQueryParams, MakeApiRequest } from ".";

export abstract class ApiService {
    private readonly API_BASE_URL = 'https://api.getgems.io/public-api';

    constructor(private readonly API_KEY: string) { }

    protected async makeApiRequest<Response>({ method, path, body, queryParams }: MakeApiRequest) {
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
            throw new Error(`Method: ${method} | Path: ${path} | Make API reqeuest: ${err}`);
        }
    }

    private makeUrl(path: string, queryParams: ApiQueryParams | undefined) {
        let url = `${this.API_BASE_URL}${path}`;
        if (queryParams) {
            url += `?${this.getQueryParams(queryParams)}`;
        }
        return url;
    }

    private getQueryParams(params: ApiQueryParams) {
        return new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, val]) => val !== undefined))).toString();
    }
}