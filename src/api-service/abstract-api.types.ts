import { BodyInit } from "node-fetch";
import { EHistoryType } from "../schemas";

export enum EApiRequestMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH"
}

export interface MakeApiRequest {
    method: EApiRequestMethod;
    path: string;
    body?: BodyInit;
    queryParams?: ApiQueryParams;
}

export interface ApiQueryParams {
    after?: AfterParameter,
    limit?: LimitParameter;
    minTime?: MinTimeParameter,
    maxTime?: MaxTimeParameter,
    types?: EHistoryType[],
    reverse?: boolean,
    kind?: ECollectionsTopKind;
}

//Query params
export type LimitParameter = number;

export type AfterParameter = string;

export type MinTimeParameter = number;

export type MaxTimeParameter = number;

export enum ECollectionsTopKind {
    Day = "day",
    Week = "week",
    Month = "month",
    All = "all"
}