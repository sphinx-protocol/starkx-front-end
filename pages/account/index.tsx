// @ts-nocheck

import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Provider } from 'starknet'
import {
    useContractRead,
    useContractWrite,
    useAccount,
    useSignTypedData,
    erc20ABI
} from 'wagmi'
import ERC20Fake from 'contracts/abi/ERC20Fake.json'
import L1EthRemoteCore from 'contracts/abi/L1EthRemoteCore.json'
import { getRSVFromSig, SplitUint256 } from 'utils/eip712'
import {
    tokenAddresses,
    contractAddresses,
    remoteTokenAddresses,
} from 'utils/addresses'
import {strToFelt} from "utils/utils";
import addresses from 'contracts/deployments'

const renderToken = (name: string, amount: any) => {
    const logos = {}
    return (
        <div className="flex flex-row w-full justify-between border border-themeBorderGrey mt-2 items-center py-1 px-2">
            <div className="flex flex-row items-center">
                <img src={`/${name}.svg`} className="w-8"></img>
                <div className="ml-2">{name}</div>
            </div>
            <div className="flex flex-row">
                {Number(amount) / 1e18} {name === 'ETHEREUM' ? 'ETH' : name}
            </div>
        </div>
    )
}

const Account: NextPage = () => {
    const { address, isConnected } = useAccount()
    const [depositAmount, setDepositAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [dexUSDCBalance, setDexUSDCBalance] = useState(0)
    const [dexDAIBalance, setDexDAIBalance] = useState(0)
    const [dexWETHBalance, setDexWETHBalance] = useState(0)
    const [selectedDepositToken = 'USDC', setSelectedDepositToken] =
        useState('USDC')
    const [selectedWithdrawToken = 'USDC', setSelectedWithdrawToken] =
        useState('USDC')
    const [r, setR] = useState<SplitUint256>()
    const [s, setS] = useState<SplitUint256>()
    const [v, setV] = useState('')
    const [message, setMessage] = useState({})
    const [salt, setSalt] = useState(
        SplitUint256.fromHex('0x' + Math.floor(Math.random() * 50000))
    )

    const starknetProvider = new Provider({
        sequencer: {
            // network: 'goerli-alpha',
            baseUrl: 'https://alpha4-2.starknet.io',
            feederGatewayUrl: 'feeder_gateway',
            gatewayUrl: 'gateway',
        },
    })

    const postRequest = () => {
        axios
            .post('/api/eip712', {
                r: r,
                s: s,
                v: v,
                message: message,
            })
            .then((result) => {
                console.log('result', result)
                setSalt(
                    SplitUint256.fromHex(
                        '0x' + Math.floor(Math.random() * 50000)
                    )
                )
            })
            .catch((err) => {
                console.log('error', err)
            })
    }

    const startWithdraw = useSignTypedData({
        domain: {
            name: 'stark-x',
            version: '1',
            chainId: '5',
        },

        types: {
            Order: [
                { name: 'authenticator', type: 'bytes32' },
                { name: 'base_asset', type: 'bytes32' },
                { name: 'author', type: 'address' },
                { name: 'quote_asset', type: 'bytes32' },
                { name: 'amount', type: 'uint256' },
                { name: 'price', type: 'uint256' },
                { name: 'strategy', type: 'uint256' },
                { name: 'chainId', type: 'uint256' },
                { name: 'orderId', type: 'uint256' },
                { name: 'salt', type: 'uint256' },
            ],
        } as const, // <--- const assertion

        value: {
            authenticator:
            addresses.L2EthRemoteEIP712Contract,
            base_asset: remoteTokenAddresses[selectedWithdrawToken],
            author: address, // author
            quote_asset: remoteTokenAddresses[selectedWithdrawToken], // token address
            amount: withdrawAmount,
            price: 0,
            strategy: 7,
            chainId: 1,
            orderId: 1,
            salt: salt.toHex(),
        },
    })

    useEffect(() => {
        fetchUSDCBalance()
        fetchDAIBalance()
        fetchWETHBalance()
    }, [])

    useEffect(() => {
        if (startWithdraw.data) {
            const { r, s, v } = getRSVFromSig(startWithdraw.data)
            setR(r)
            setS(s)
            setV(v)
            setMessage({
                authenticator:
                addresses.L2EthRemoteEIP712Contract,
                base_asset: remoteTokenAddresses[selectedWithdrawToken],
                author: address, // author
                quote_asset: remoteTokenAddresses[selectedWithdrawToken], // token address
                amount: withdrawAmount,
                price: 0,
                strategy: 7,
                chainId: 1,
                orderId: 1,
                salt: salt.toHex(),
            })
        }
    }, [startWithdraw.data])

    useEffect(() => {
        postRequest()
    }, [message])

    const fetchUSDCBalance = async () => {
        const result = await starknetProvider.callContract({
            contractAddress:
            addresses.L2GatewayContract,
            entrypoint: 'get_balance',
            calldata: [
                strToFelt(address), // user address
                strToFelt(addresses.L2USDC), // token address
                '1',
            ],
        })
        console.log('result', result)
        setDexUSDCBalance(Number(result.result[0]))
    }

    const fetchDAIBalance = async () => {
        const result = await starknetProvider.callContract({
            contractAddress:
            addresses.L2GatewayContract,
            entrypoint: 'get_balance',
            calldata: [
                strToFelt(address), // user address
                '123213', // token address
                '1',
            ],
        })
        console.log('result', result)
        setDexDAIBalance(Number(result.result[0]))
    }

    const fetchWETHBalance = async () => {
        const result = await starknetProvider.callContract({
            contractAddress:
            addresses.L2GatewayContract,
            entrypoint: 'get_balance',
            calldata: [
                strToFelt(address), // user address
                strToFelt(addresses.L2ETH),, // token address
                '1',
            ],
        })
        console.log('result', result)
        setDexWETHBalance(Number(result.result[0]))
    }

    console.log("ex",strToFelt(address))

    const WETHBalance = useContractRead({
        address: tokenAddresses['WETH'],
        abi: ERC20Fake.abi,
        functionName: 'balanceOf',
        args: [address],
    })

    const USDCBalance = useContractRead({
        address: tokenAddresses['USDC'],
        abi: ERC20Fake.abi,
        functionName: 'balanceOf',
        args: [address],
    })

    const DAIBalance = useContractRead({
        address: tokenAddresses['DAI'],
        abi: ERC20Fake.abi,
        functionName: 'balanceOf',
        args: [address],
    })

    const approveToken = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: tokenAddresses[selectedDepositToken],
        abi: erc20ABI,
        functionName: 'approve',
        args: [addresses.L1EthRemoteCoreContract, depositAmount],
    })

    const L1EthRemoteCoreDeposit = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: addresses.L1EthRemoteCoreContract,
        abi: L1EthRemoteCore.abi,
        functionName: 'remoteDepositAccount',
        args: [tokenAddresses[selectedDepositToken], depositAmount],
    })

    const L1EthRemoteCoreWithdraw = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: addresses.L1EthRemoteCoreContract,
        abi: L1EthRemoteCore.abi,
        functionName: 'confirmRemoteWithdraw',
        args: [remoteTokenAddresses[selectedWithdrawToken], withdrawAmount],
    })

    const handleDepositDropdownChange = (e: any) => {
        setSelectedDepositToken(e.target.value)
    }

    const handleWithdrawDropdownChange = (e: any) => {
        setSelectedWithdrawToken(e.target.value)
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="text-white max-w-7xl  flex flex-row w-full">
                <div className="w-full flex-col bg-themeDarkGrey p-5">
                    <div className="text-lg">Virtual Deposits:</div>
                    <select className="mt-3 bg-themeGreen w-full p-2.5 text-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>
                            Select Chain
                        </option>
                        <option>Ethereum</option>
                        <option>Polygon</option>
                        <option>Arbitrum</option>
                        <option>Optimism</option>
                    </select>
                    <div className="mt-6">
                        {renderToken('ETHEREUM', WETHBalance.data)}
                        {renderToken('USDC', USDCBalance.data)}
                        {renderToken('DAI', DAIBalance.data)}
                    </div>
                    <div className="mt-10">
                        Virtual Deposit From Ethereum to Starknet
                    </div>
                    <div className="relative w-full lg:max-w-sm mt-3">
                        <select
                            onChange={(e) => handleDepositDropdownChange(e)}
                            className="bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        >
                            <option selected disabled hidden>
                                Select Token
                            </option>
                            <option>WETH</option>
                            <option>DAI</option>
                            <option>USDC</option>
                        </select>
                        <div className="mt-3">Enter Amount</div>
                        <input
                            // type="number"
                            name="depositAmount"
                            id="price"
                            value={depositAmount}
                            className="mt-1 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // placeholder="0.00"
                            onChange={(event) =>
                                setDepositAmount(Number(event.target.value) * 1e18)
                            }
                        />
                        <button
                            className="mt-3 p-2 w-36 bg-themeBlue text-black"
                            onClick={() => approveToken.write()}
                        >
                            Approve
                        </button>
                        <button
                            className="mt-3 ml-4 p-2 w-36 bg-themeGreen text-black"
                            onClick={() => L1EthRemoteCoreDeposit.write()}
                        >
                            Deposit
                        </button>
                    </div>
                </div>
                <div className="w-full flex-col ml-20 bg-themeDarkGrey p-5">
                    <div className="text-lg">
                        Starknet DEX Account Balances:
                    </div>
                    <div className="mt-6">
                        {renderToken('ETHEREUM', dexWETHBalance)}
                        {renderToken('USDC', dexUSDCBalance)}
                        {renderToken('DAI', dexDAIBalance)}
                    </div>
                    <div className="mt-6">
                        Virtual Deposit From Ethereum to Starknet
                    </div>
                    <div className="relative w-full lg:max-w-sm">
                        <select className="mt-2 bg-themeGreen w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                            <option selected disabled hidden>
                                Select Chain
                            </option>
                            <option>Ethereum</option>
                            <option>Polygon</option>
                            <option>Arbitrum</option>
                            <option>Optimism</option>
                        </select>
                        <select
                            onChange={(e) => handleWithdrawDropdownChange(e)}
                            className="mt-2 bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        >
                            <option selected disabled hidden>
                                Select Token
                            </option>
                            <option>WETH</option>
                            <option>DAI</option>
                            <option>USDC</option>
                        </select>
                        <div className="mt-3">Enter Amount</div>
                        <input
                            // type="number"
                            name="withdrawAmount"
                            id="price"
                            value={withdrawAmount}
                            className="mt-2 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // placeholder="0.00"
                            onChange={(event) =>
                                setWithdrawAmount(Number(event.target.value) * 1e18)
                            }
                        />
                        <div>
                            <div className="mt-2">
                                <button
                                    className="mt-2 p-2 w-36 bg-themeOrange text-black"
                                    onClick={() =>
                                        startWithdraw.signTypedData()
                                    }
                                >
                                    Start Process
                                </button>
                                <button
                                    className="mt-2 p-2 w-36 bg-themeBlue text-black m-4"
                                    onClick={() =>
                                        L1EthRemoteCoreWithdraw.write()
                                    }
                                >
                                    Finish Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
