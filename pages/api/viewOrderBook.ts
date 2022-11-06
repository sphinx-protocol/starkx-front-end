// @ts-nocheck
import { Provider, Contract } from 'starknet'
import type { NextApiRequest, NextApiResponse } from 'next'
import addresses from 'contracts/deployments'
const {
    abi: L2GatewayContractABI,
} = require('contracts/abi/L2GatewayContract.json')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        let { baseAsset, quoteAsset, isBid } = req.body

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

        let orderBookResponse = await L2GatewayContract.call(
            'view_order_book',
            [
                '0x02cb4e9247314a786d26868acef9a00dc06da10b3dd4d596336466fa2e0214b8',
                '0x05b25162194a92ba6e871b5bae29b8af2889a63d19e72c99ccaa27a2e5abc6ea',
                1,
            ]
        )
        res.status(200).json({
            data: orderBookResponse.prices.map((price, i) => {
                return {
                    price: Number(price),
                    amount: Number(orderBookResponse.amounts[i]),
                }
            }),
        })
    } else {
        res.status(400).json({ status: 'Wrong request method' })
    }
}
