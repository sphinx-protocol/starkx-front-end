export interface AskOrderBook {
    price: number
    amount: number
}

export interface BidOrderBook {
    price: number
    amount: number
}

export interface BidBuckets {
    [bucket: number]: BidBucketDetails
}

export interface BidBucketDetails {
    price: number
    amount: number
    orders: BidOrderBook[]
    total: number
}

export interface AskBuckets {
    [bucket: number]: AskBucketDetails
}

export interface AskBucketDetails {
    price: number
    amount: number
    orders: AskOrderBook[]
    total: number
}

export interface OrderBookProps {
    baseAsset: string
    quoteAsset: string
}

export type OrderBook = {
    price: number
    amount: number
}[]
