export interface DefaultErrorObject {
    name: string;
    status: number;
    errors: {
        path?: string;
        message: string;
        errorCode?: string;
    }[];
}

export interface UpdateResponse {
    success?: boolean;
    response?: UpdateData;
}

export interface UpdateData {
    status?: EUpdateDataStatus;
    address?: string;
    createdAt?: string;
}

export enum EUpdateDataStatus {
    JustCreated = "just_created",
    InQueue = "in_queue",
    Updating = "updating",
    Ready = "ready",
    Problem = "problem"
}

export interface UpdateRequest {
    update: {
        name?: string;
        description?: string;
        image?: string;
        attributes?: NftAttribute[];
        upsertAttributes?: NftAttribute[];
        buttons?: NftButton[];
    };
}

export interface CollectionUpdateRequest {
    requestId: string;
    metadata: {
        name: string;
        description: string;
        image: string;
        external_link: string;
        social_links: string[];
        cover_image: string;
    };
    royaltyPercent: number;
    royaltyAddress: string;
}

export interface NftButton {
    label: string;
    uri: string;
}

export interface SyncRequest {
    nftAddresses: string[];
}

export interface MintingRequest {
    requestId: string;
    ownerAddress: string;
    name: string;
    description: string;
    image: string;
    lottie?: string;
    content_url?: string;
    attributes?: NftAttribute[];
    buttons?: NftButton[];
    index?: number | null;
}

export interface BatchMintingItem {
    ownerAddress: string;
    name: string;
    description: string;
    image: string;
    lottie?: string;
    content_url?: string;
    attributes?: NftAttribute[];
    buttons?: NftButton[];
    index?: number;
}

export interface BatchMintingRequest {
    requestId: string;
    items: BatchMintingItem[];
}

export interface V2BatchMintingRequest {
    items: (BatchMintingItem & {
        requestId: string;
    })[];
}

export interface NftAttribute {
    trait_type: string;
    value: string;
}

export interface FailedResponse {
    name: string;
    status: number;
    errors: {
        message?: string;
    }[];
}

export interface BatchMintingStatusResponse {
    response: {
        success: boolean;
        requestId?: string;
        errorMessage?: string | null;
        data?: {
            status: EMintingStatus;
            index: number;
            address: string;
            ownerAddress: string;
            url: string;
        };
    }[];
}

export enum EMintingStatus {
    JustCreated = "just_created",
    InQueue = "in_queue",
    Minting = "minting",
    Ready = "ready",
    Problem = "problem"
}

export interface MintingStatusObject {
    status: EMintingStatus;
    index: number;
    address: string;
    ownerAddress: string;
    url: string;
}

export interface MintingStatusResponse {
    success: boolean;
    response: MintingStatusObject;
}

export interface UploadResponse {
    success: boolean;
    response: {
        uploadUrl: string;
        keyPrefix: string;
        urlPrefix: string;
        formFields: {
            name: string;
            value: string;
        }[];
    };
}

export interface OwnershipChangeEvent {
    address: string;
    timestamp: number;
    eventType: EOwnershipChangeEventType;
    oldOwner: string;
    newOwner: string;
}

export enum EOwnershipChangeEventType {
    Transfer = "transfer",
    Sold = "sold",
    Burn = "burn"
}

export interface NftItem {
    index: number;
    address: string;
    ownerAddress: string;
    actualOwnerAddress?: string;
    name: string | null;
    attributes?: NftItemAttribute[];
}

export interface NftItemFull {
    address: string;
    kind: ENftItemKind;
    collectionAddress: string | null;
    ownerAddress: string;
    actualOwnerAddress?: string;
    name: string | null;
    description?: string | null;
    attributes?: NftItemAttribute[];
    image: string | null;
    imageSizes: {
        "96": string;
        "352": string;
    } | null;
    sale?: FixPriceSale | Auction | null;
    warning?: {
        type: ENftItemWarning;
        reason: string;
    } | null;
}

export enum ENftItemKind {
    Single = "Single",
    CollectionItem = "CollectionItem",
    DnsItem = "DnsItem",
    SbtItem = "SbtItem",
    SbtSingle = "SbtSingle",
    SyntheticItem = "SyntheticItem",
    SyntheticSbt = "SyntheticSbt",
    OffchainNft = "OffchainNft",
    OffchainSticker = "OffchainSticker"
}

export enum ENftItemWarning {
    NftBanFromFragment = "NftBanFromFragment"
}

export enum ESaleType {
    FixPriceSale = "FixPriceSale",
    Auction = "Auction"
}

export interface FixPriceSale {
    type: ESaleType.FixPriceSale;
    fullPrice: string;
    currency: ECurrency;
    marketplaceFee: string;
    marketplaceFeeAddress: string;
    royaltyAddress: string;
    royaltyAmount: string;
    version: string;
    contractType: EContractType;
    contractAddress: string | null;
}

export enum EContractType {
    Telemint = "telemint",
    Offchain = "offchain",
    SaleContract = "sale-contract"
}

export interface Auction {
    type: ESaleType.Auction;
    currency: ECurrency;
    minBid: string;
    maxBid?: string | null;
    finishAt: string;
    lastBidAmount?: string | null;
    lastBidAddress?: string | null;
    lastBidAt?: string | null;
    marketplaceFee: string;
    marketplaceFeeAddress: string;
    royaltyAddress?: string;
    royaltyPercent?: {
        base?: number;
        factor?: number;
    } | null;
    version: string;
    contractType: EContractType;
    contractAddress: string | null;
}

export interface NftCollectionFull {
    address: string;
    ownerAddress: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    imageSizes: {
        "96": string;
        "352": string;
    } | null;
}

export interface NftItemAttribute {
    traitType: string;
    value: string;
}

export interface NftItemsResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: NftItem[];
    };
}

export interface NftItemsFullResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: NftItemFull[];
    };
}

export interface NftItemResponse {
    success: boolean;
    response: NftItem;
}

export interface NftItemFullResponse {
    success: boolean;
    response: NftItemFull | null;
}

export interface NftCollectionFullResponse {
    success: boolean;
    response: NftCollectionFull | null;
}

export interface MintingMessageResponse {
    success: boolean;
    response: {
        message: string;
    };
}

export interface MintingWalletBalanceResponse {
    success: boolean;
    response: {
        balance: string;
    };
}

export interface CNFTRequest {
    items: CNFTRequestItem[];
}

export interface CNFTRequestItem {
    index: number;
    ownerAddress: string;
    name: string;
    description: string;
    lottie?: string;
    content_url?: string;
    image: string;
    attributes?: NftAttribute[];
    buttons?: NftButton[];
}

export interface OpenCNFTResult {
    response: {
        deployId: number;
        isDeployed: boolean;
    };
    success: boolean;
}

export interface CNFTItem {
    index: number;
    contentUrl: string;
}

export interface AddCNFTToCollectionResponse {
    response: {
        items: CNFTItem[];
    };
    success: boolean;
}

export interface NftCollectionStatsResponse {
    response: NftCollectionStats | null;
    success: boolean;
}

export interface NftCollectionStats {
    floorPrice?: number | null;
    floorPriceNano?: string | null;
    itemsCount: number;
    totalVolumeSold: string;
    totalVolumeSoldNano?: string;
    holders: number;
}

export interface NftItemHistoryResponse {
    response: NftItemHistory;
    success: boolean;
}

export interface NftItemHistory {
    cursor: string | null;
    items: NftItemHistoryItem[];
}

export interface NftItemHistoryItem {
    address: string;
    name: string | null;
    time: string;
    timestamp?: number;
    collectionAddress: string | null;
    lt: string;
    hash: string;
    typeData: HistoryTypeMint
    | HistoryTypeTransfer
    | HistoryTypeCancelSale
    | HistoryTypeSold
    | HistoryTypePutUpForSale
    | HistoryTypePutUpForAuction
    | HistoryTypeCancelAuction
    | HistoryTypeBurn
    | null;
    isOffchain: boolean;
}

export interface NftItemsUpdateResponse {
    success: boolean;
    response: {
        type: ENftItemsUpdateResponseType.UPDATES;
        cursor: string | null;
        items: NftItemFull[];
    } | {
        type: ENftItemsUpdateResponseType.NO_UPDATES;
    };
}

export enum ENftItemsUpdateResponseType {
    UPDATES = "UPDATES",
    NO_UPDATES = "NO_UPDATES"
}

export enum EHistoryType {
    Mint = "mint",
    Transfer = "transfer",
    Sold = "sold",
    CancelSale = "cancelSale",
    PutUpForSale = "putUpForSale",
    PutUpForAuction = "putUpForAuction",
    CancelAuction = "cancelAuction",
    Burn = "burn",
}

export enum ECurrency {
    TON = "TON",
    USDT = "USDT",
    NOT = "NOT",
    SNT = "SNT",
    DFC = "DFC",
    FTON = "FTON",
    PTONv1 = "pTONv1",
    GTON = "GTON",
    WOOF = "WOOF",
    DOGS = "DOGS",
    CATS = "CATS",
    PX = "PX",
    MAJOR = "MAJOR",
    PUNK = "PUNK",
    UNIT_TEST = "UNIT_TEST",
    NOTTEST = "NOTTEST",
    VAT = "VAT",
    HOLDER = "HOLDER",
    STON = "STON",
    CATI = "CATI",
    XAUt0 = "XAUt0",
    TSLAx = "TSLAx",
    AAPLx = "AAPLx",
    NVDAx = "NVDAx",
    GOOGLx = "GOOGLx",
    NFLXx = "NFLXx",
}

export interface HistoryTypeMint {
    type?: EHistoryType;
}

export interface HistoryTypeTransfer {
    type?: EHistoryType;
    oldOwner?: string | null;
    newOwner?: string | null;
}

export interface HistoryTypeCancelSale {
    type?: EHistoryType;
    owner?: string | null;
    price?: string | null;
    priceNano?: string | null;
    currency?: string;
}

export interface HistoryTypeSold {
    type?: EHistoryType;
    oldOwner?: string | null;
    newOwner?: string | null;
    price?: string | null;
    priceNano?: string | null;
    currency?: ECurrency;
    rejectFromGlobalTop?: boolean;
}

export interface HistoryTypePutUpForSale {
    type?: EHistoryType;
    owner?: string | null;
    price?: string | null;
    priceNano?: string | null;
    currency?: ECurrency;
    isPriceChange?: boolean | null;
}

export interface HistoryTypePutUpForAuction {
    type?: EHistoryType;
    owner?: string | null;
}

export interface HistoryTypeCancelAuction {
    type?: EHistoryType;
    owner?: string | null;
}

export interface HistoryTypeBurn {
    type?: EHistoryType;
    oldOwner?: string | null;
    newOwner?: string | null;
}

export interface BuyNftFixPriceRequest {
    version: string;
}

export interface PutUpNftForSaleRequest {
    ownerAddress: string;
    fullPrice: string;
    currency: ECurrency | null;
    omitRoyalty: boolean | null;
}

export interface TransactionResponse {
    success?: boolean;
    response?: Transaction;
}

export interface Transaction {
    uuid?: string;
    from?: string | null;
    timeout?: string;
    list?: TransactionListItem[];
}

export interface TransactionListItem {
    to?: string;
    amount?: string;
    payload?: string | null;
    stateInit?: string | null;
    check?: string;
    context?: {
        key?: string;
        value?: string;
    }[];
}

export interface NftCollectionStatsCountResponse {
    success?: boolean;
    response?: NftCollectionStatsCount;
}

export interface NftCollectionStatsCount {
    holders?: number;
    to1?: number;
    from2to5?: number;
    from6to24?: number;
    from25to50?: number;
    from50?: number;
    updatedAt?: string;
    averageNumberOfNftPerOwner?: number;
    uniqueHolders?: number;
}

export interface NftCollectionOwnersTopResponse {
    success?: boolean;
    response?: NftCollectionOwnersTop;
}

export interface NftCollectionOwnersTop {
    cursor?: string | null;
    items?: NftCollectionOwnersTopItem[];
}

export interface NftCollectionOwnersTopItem {
    ownerAddress?: string;
    count?: number;
    value7d?: string;
    value7dNano?: string;
    amount7d?: number;
    updatedAt?: string;
}

export interface NftCollectionAttributesResponse {
    success?: boolean;
    response?: NftCollectionAttributes;
}

export interface NftCollectionAttributes {
    attributes?: NftCollectionAttribute[];
}

export interface NftCollectionAttribute {
    traitType?: string;
    values?: {
        value?: string;
        count?: number;
        minPrice?: string | null;
        minPriceNano?: string | null;
    }[];
}

export interface NftItemsByAddressRequestBody {
    addressList: string[];
}

export interface NftItemsFullNoCursorResponse {
    success: boolean;
    response: {
        items: NftItemFull[];
    };
}

export interface NftCollectionMetadata {
    name: string;
    description: string;
    image?: string;
    external_link?: string;
    social_links?: string[];
    cover_image?: string;
}

export interface CreateNewCollectionRequest {
    requestId: string;
    ownerAddress: string;
    royaltyPercent: number;
    royaltyAddress: string;
    metadata: NftCollectionMetadata;
}

export interface NftCollectionCreatingStatusResponse {
    success: boolean;
    response: NftCollectionCreatingStatus;
}

export interface NftCollectionCreatingStatus {
    status: Exclude<EMintingStatus, EMintingStatus.JustCreated>;
    address: string;
}

export interface TransferResponse {
    success: boolean;
    response: {
        address: string;
        newOwnerAddress: string;
    };
}

export interface TransferOffchainGiftRequest {
    newOwnerAddress: string;
}

export interface NftCollectionFloorResponse {
    success: boolean;
    response: {
        contract_address: string;
        name: string | null;
        slug: string;
        floor: number;
        volume: number;
        total_supply: number;
        sales_count: number;
        unique_owners: number | null;
        image_url: string | null;
        discord_url: string | null;
        twitter_url: string | null;
        website_url: string | null;
        description: string | null;
        banner_image_url: string | null;
        royalty_fees: number | null;
        getgems_url: string;
    };
}

export interface ReindexResponse {
    success: boolean;
    response: {
        status: EReindexResponseStatus;
        reason?: string;
    };
}

export enum EReindexResponseStatus {
    Failed = "failed",
    Success = "success"
}

export interface UserTradingInfoResponse {
    success: boolean;
    response: {
        tradingCount: number;
        tradingVolume: string;
        balance: string;
    };
}

export interface NftCollectionsFullResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: NftCollectionFull[];
    };
}

export interface NftStickerCollectionsFullResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: (NftCollectionFull & {
            marketplace: StickerMarketplace;
        })[];
    };
}

export interface StickerMarketplace {
    id: number;
    name: string;
    url: string;
    image: string;
}

export enum ELang {
    Ru = "ru",
    En = "en",
}

export interface GiftTransferRequest {
    nftAddress: string;
    newOwnerAddress: string;
    lang: ELang;
}

export interface ConfirmTransferRequest {
    nftAddress: string;
    newOwnerAddress: string;
    lang: ELang;
    signatureData?: {
        timestamp?: number;
        domain?: string;
        signature?: string;
        text?: string;
    };
}

export interface RequestTransferResponse {
    success: boolean;
    response: {
        signatureData: {
            type: ESignatureDataType;
            text: string;
        };
    };
}

export enum ESignatureDataType {
    Text = "text"
}

export interface ConfirmTransferResponse {
    success: boolean;
    response: {
        nftAddress: string;
        newOwnerAddress: string;
    };
}

export interface StorageBoxIdResponse {
    success: boolean;
    response: {
        boxId: number;
    };
}

export interface StorageUploadCredentials {
    collectionAddress?: string;
    uploadUrl: string;
    keyPrefix: string;
    urlPrefix: string;
    formFields: {
        name?: string;
        value?: string;
    }[];
}

export interface StorageUploadCredentialsResponse {
    success: boolean;
    response: StorageUploadCredentials;
}

export interface SetStorageCollectionRequest {
    collectionAddress: string;
}

export interface SetStorageCollectionResponse {
    success: boolean;
    response: {
        collectionAddress: string;
    };
}

export interface CheckTxPayload {
    from?: string;
    to: string;
    amount: string;
    check: string;
    uuid: string;
    context: {
        key: string;
        value: string;
    }[];
}

export interface TonTxStatusResponse {
    success: boolean;
    response: TonTxStatus;
}

export interface TonTxStatus {
    state: ETonTxState;
    extra: string | null;
}

export enum ETonTxState {
    NotReady = "NotReady",
    Ready = "Ready",
    Failed = "Failed"
}

export interface MintingListItem {
    type: EMintingListItemType;
    status: EMintingListItemStatus;
    requestId: string;
    address: string;
}

export enum EMintingListItemType {
    MintNft = "mintNft",
    UpdateNft = "updateNft",
    AddCollection = "addCollection",
    UpdateCollection = "updateCollection"
}

export enum EMintingListItemStatus {
    InQueue = "in_queue",
    Ready = "ready",
    Problem = "problem"
}

export interface MintingListResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: MintingListItem[];
    };
}

export interface CollectionsTopResponse {
    success: boolean;
    response: {
        cursor: string | null;
        items: CollectionsTopItem[];
    };
}

export interface CollectionsTopItem {
    place: number;
    collection: NftCollectionFull;
    value: string;
    floorPrice: number;
    diffPercent?: number;
}

export interface OfferListResponse {
    success: boolean;
    response: {
        items: Offer[];
        cursor: string | null;
    };
}

export interface Offer {
    nftAddress: string | null;
    collectionAddress: string | null;
    fullPrice: string;
    profitPrice: string;
    royaltyPrice: string;
    feePrice: string;
    currency: ECurrency;
    offerAddress: string;
    feeAddress: string;
    royaltyAddress: string;
    finishAt: number;
    isCollectionOffer: boolean;
    isOffchain: boolean;
    purchasedQuantity?: number;
    maxQuantity?: number;
}

export interface CreateNftOfferPayload {
    userAddress: string;
    nftAddress: string;
    price: string;
    finishAt: number;
    omitRoyalty?: boolean | null;
    nftVersion?: string | null;
    forOffchain?: boolean | null;
}

export interface CreateCollectionOfferPayload {
    userAddress: string;
    collectionAddress: string;
    price: string;
    finishAt: number;
    amount: number;
    omitRoyalty?: boolean | null;
    attributes?: { trait: string, values: string[]; }[] | null;
    forOffchain?: boolean | null;
}

export interface AcceptOfferRequest {
    userAddress: string;
    nftAddress: string;
    offerAddress: string;
}

export interface CancelOfferRequest {
    userAddress: string;
    offerAddress: string;
}

export interface UserOfferListResponse {
    success: boolean;
    response: {
        items: OfferWithStatus[];
        cursor: string | null;
    };
}

export interface OfferWithStatus extends Offer {
    isCompleted: boolean;
}