import { BodyInit } from "node-fetch";
import { AfterParameter, ECollectionsTopKind, LimitParameter, MaxTimeParameter, MinTimeParameter } from "../getgems.parameters";
import { EHistoryType } from "../getgems.schemas";
import { EApiRequestMethod } from "../getgems.types";

export interface ReadApiMakeApiRequest {
    method: EApiRequestMethod;
    path: string;
    body?: BodyInit;
    queryParams?: ReadApiQueryParams;
}

export interface ReadApiQueryParams {
    after?: AfterParameter,
    limit?: LimitParameter;
    minTime?: MinTimeParameter,
    maxTime?: MaxTimeParameter,
    types?: EHistoryType[],
    reverse?: boolean,
    kind?: ECollectionsTopKind;
}
