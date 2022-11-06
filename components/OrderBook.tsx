import { useEffect, useState } from 'react'
import {
    Buckets,
    BucketDetails,
    OrderBookProps,
    OrderBook,
} from 'interfaces/interfaces'
// import { generateDummyOrderBooks } from 'data/generateDummyData'
import { formatNumber } from 'utils/utils'
import addresses from 'contracts/deployments'
import axios from 'axios'

function OrderBook() {
    const [bidOrderBook, setBidOrderBook] = useState<OrderBook[]>()
    const [askOrderBook, setAskOrderBook] = useState<OrderBook[]>()
    const [sortedBidBuckets, setSortedBidBuckets] = useState<BucketDetails[]>()
    const [sortedAskBuckets, setSortedAskBuckets] = useState<BucketDetails[]>()
    const [maxBucketAmount, setMaxBucketAmount] = useState<number>(0)

    useEffect(() => {
        axios
            .post('/api/viewOrderBook', {
                baseAsset: addresses.L2USDC,
                quoteAsset: addresses.L2ETH,
                isBid: 1,
            })
            .then((result) => {
                const { orders, sortedBuckets, maxBucketAmount } = result.data
                setBidOrderBook(orders)
                setSortedBidBuckets(sortedBuckets)
                setMaxBucketAmount(maxBucketAmount)
            })
            .catch((err) => {
                console.error('error', err)
            })

        axios
            .post('/api/viewOrderBook', {
                baseAsset: addresses.L2USDC,
                quoteAsset: addresses.L2ETH,
                isBid: 0,
            })
            .then((result) => {
                const { orders, sortedBuckets, maxBucketAmount } = result.data
                setAskOrderBook(orders)
                setSortedAskBuckets(sortedBuckets)
                setMaxBucketAmount(maxBucketAmount)
            })
            .catch((err) => {
                console.error('error', err)
            })
    }, [])

    const [scrollEffect, setScrollEffect] = useState(false)

    let askOrderBookDiv: any

    if (typeof window !== 'undefined') {
        askOrderBookDiv = document.getElementById('askOrderBook')
    }

    useEffect(() => {
        if (askOrderBookDiv && !scrollEffect) {
            askOrderBookDiv.scrollTop = askOrderBookDiv.scrollHeight
            if (askOrderBookDiv.scrollTop > 0) {
                setScrollEffect(true)
            }
        }
    }, [askOrderBook])

    return (
        <div className="flex flex-col text-themeTextGrey">
            <div className=" text-lg px-5 mt-5">Order Books</div>
            <div className="flex flex-row w-full p-5 shadow-md border-b-400 min-w-min">
                {/* <div className="flex justify-between">
            <div>Filter</div>
            <div>1</div>
        </div> */}
                <div className="flex flex-col items-end w-full">
                    <div className="flex justify-between mb-1 text-xs w-full">
                        <p className="w-1/3 text-center">Price</p>
                        <p className="w-1/3 text-center">Quantity</p>
                        <p className="w-1/3 text-center">Total</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <div
                            className="overflow-y-scroll h-60 "
                            id="askOrderBook"
                        >
                                                        {sortedBidBuckets &&
                                sortedBidBuckets.map((bucket, id) => {
                                    console.log(bucket);
                                    return (
                                        <div
                                            key={id.toString()}
                                            className="relative flex flex-col w-full my-0.5 cursor-pointer border border-themeBorderGrey hover:border-blue-500"
                                        >
                                            <div
                                                className={`h-full bg-themeGreen absolute`}
                                                style={{
                                                    width:
                                                        (bucket.amount /
                                                            maxBucketAmount) *
                                                            100 +
                                                        '%',
                                                }}
                                            ></div>
                                            <div
                                                id={id.toString()}
                                                className="relative flex flex-row items-center justify-between px-1 text-black"
                                            >
                                                <div className="text-white">
                                                    {formatNumber(bucket.price)}
                                                </div>
                                                <div className="text-white">
                                                    {formatNumber(
                                                        bucket.amount
                                                    )}
                                                </div>
                                                <div className="text-white">
                                                    {formatNumber(
                                                        bucket.total
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center w-full m-1">
                    <div>Market Pair: ETH/USDC</div>
                    <div className="text-white text-lg">
                        Price:
                        {sortedBidBuckets && sortedBidBuckets.length
                            ? ' ' +
                              Number(sortedBidBuckets[0].price).toFixed(2) +
                              ' USDC/ETH'
                            : '-'}
                    </div>
                    <div className="flex flex-row mt-3">
                        <img src="/USDC.svg" className="w-12"></img>
                        <img src="/ETHEREUM.svg" className="w-12 ml-3"></img>
                    </div>
                </div>
                <div className="flex flex-col items-end w-full">
                    <div className="flex justify-between mb-1 text-xs w-full">
                        <p className="w-1/3 text-center">Price</p>
                        <p className="w-1/3 text-center">Quantity</p>
                        <p className="w-1/3 text-center">Total</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="overflow-y-scroll h-60">
                        {sortedAskBuckets &&
                                sortedAskBuckets.map((bucket, id) => {
                                    return (
                                        <div
                                            className="relative flex flex-col w-full my-0.5 cursor-pointer border border-themeBorderGrey hover:border-blue-500"
                                            key={id}
                                        >
                                            <div
                                                className="absolute h-full bg-themeRed"
                                                style={{
                                                    width:
                                                        (bucket.amount /
                                                            maxBucketAmount) *
                                                            100 +
                                                        '%',
                                                }}
                                            ></div>
                                            <div
                                                id={id.toString()}
                                                className="relative flex flex-row items-center justify-between px-1 text-black"
                                            >
                                                <div className="text-white">
                                                    {formatNumber(bucket.price)}
                                                </div>
                                                <div className="text-white">
                                                    {formatNumber(
                                                        bucket.amount
                                                    )}
                                                </div>
                                                <div className="text-white">
                                                    {formatNumber(
                                                        bucket.total
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderBook
