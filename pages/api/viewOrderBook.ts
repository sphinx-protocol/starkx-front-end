// @ts-nocheck
import { Provider, Contract } from 'starknet'
import type { NextApiRequest, NextApiResponse } from 'next'
import addresses from 'contracts/deployments'
const {
    abi: L2GatewayContractABI,
} = require('contracts/abi/L2GatewayContract.json')
import { Buckets, BucketDetails } from 'interfaces/interfaces'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { baseAsset, quoteAsset, isBid } = req.body

        const provider = new Provider({
            sequencer: {
                baseUrl: 'https://alpha4-2.starknet.io',
                feederGatewayUrl: 'feeder_gateway',
                gatewayUrl: 'gateway',
            },
        })

        const L2GatewayContract = new Contract(
            L2GatewayContractABI,
            addresses.L2GatewayContract,
            provider
        )

        const orderBookResponse = await L2GatewayContract.call(
            'view_order_book',
            [baseAsset, quoteAsset, isBid]
        )

        const orders = orderBookResponse.prices.map((price, i) => {
            return {
                price: Number(price),
                amount: Number(orderBookResponse.amounts[i]),
            }
        })

        let buckets: Buckets = {}
        let newMaxBucketAmount = 0;

        orders.map((order) => {
            const priceInt = Number(order.price) / 1e18
            const amountInt = Number(order.amount) / 1e18
            const bucket: number = Math.floor(priceInt)
            if (buckets[bucket] === undefined) {
                buckets[bucket] = {
                    price: bucket,
                    amount: amountInt,
                    orders: [order],
                    total: priceInt * amountInt,
                }
                newMaxBucketAmount = Math.max(
                    newMaxBucketAmount,
                    buckets[bucket].amount
                )
            } else {
                buckets[bucket].amount += order.amount
                newMaxBucketAmount = Math.max(
                    newMaxBucketAmount,
                    buckets[bucket].amount
                )
                buckets[bucket].orders.push(order)
                buckets[bucket].total += priceInt * amountInt
            }
        })

        const sortedBuckets: BucketDetails[] = Object.values(buckets).sort(
            (a, b) => b.price - a.price
        )

        res.status(200).json({
            orders: orders,
            sortedBuckets: sortedBuckets,
            maxBucketAmount: newMaxBucketAmount,
        })
    } else if (req.method === 'GET') {
        const baseAsset =
            '0x02cb4e9247314a786d26868acef9a00dc06da10b3dd4d596336466fa2e0214b8'
        const quoteAsset =
            '0x05b25162194a92ba6e871b5bae29b8af2889a63d19e72c99ccaa27a2e5abc6ea'
        const isBid = 1

        const provider = new Provider({
            sequencer: {
                baseUrl: 'https://alpha4-2.starknet.io',
                feederGatewayUrl: 'feeder_gateway',
                gatewayUrl: 'gateway',
            },
        })

        const L2GatewayContract = new Contract(
            L2GatewayContractABI,
            addresses.L2GatewayContract,
            provider
        )

        const orderBookResponse = await L2GatewayContract.call(
            'view_order_book',
            [baseAsset, quoteAsset, isBid]
        )

        const orders = orderBookResponse.prices.map((price, i) => {
            return {
                price: Number(price),
                amount: Number(orderBookResponse.amounts[i]),
            }
        })

        let buckets: Buckets = {}
        let newMaxBucketAmount = 0;

        orders.map((order) => {
            const priceInt = Number(order.price) / 1e18
            const amountInt = Number(order.amount) / 1e18
            const bucket: number = Math.floor(priceInt)
            if (buckets[bucket] === undefined) {
                buckets[bucket] = {
                    price: bucket,
                    amount: amountInt,
                    orders: [order],
                    total: priceInt * amountInt,
                }
                newMaxBucketAmount = Math.max(
                    newMaxBucketAmount,
                    buckets[bucket].amount
                )
            } else {
                buckets[bucket].amount += order.amount
                newMaxBucketAmount = Math.max(
                    newMaxBucketAmount,
                    buckets[bucket].amount
                )
                buckets[bucket].orders.push(order)
                buckets[bucket].total += priceInt * amountInt
            }
        })

        const sortedBuckets: BucketDetails[] = Object.values(buckets).sort(
            (a, b) => b.price - a.price
        )

        res.status(200).json({
            orders: orders,
            sortedBuckets: sortedBuckets,
            maxBucketAmount: newMaxBucketAmount,
        })
    } else {
        res.status(400).json({ status: 'Wrong request method' })
    }
}
