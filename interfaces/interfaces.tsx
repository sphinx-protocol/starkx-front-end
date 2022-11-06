export interface OrderBook {
    price: number
    amount: number
}

export interface Buckets {
    [bucket: number]: BucketDetails
}

export interface BucketDetails {
    price: number
    amount: number
    orders: OrderBook[]
    total: number
}

export interface OrderBookProps {
    baseAsset: string
    quoteAsset: string
}
