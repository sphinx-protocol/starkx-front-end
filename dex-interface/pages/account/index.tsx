import type { NextPage } from 'next'
import {useState} from "react";
import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import ERC20Fake from "../../abi/ERC20Fake.json";
import L1EthRemoteCore from "../../abi/L1EthRemoteCore.json";
import { tokenAddresses, contractAddresses, remoteTokenAddresses } from '../../utils/addresses';

const renderToken = (name : string, amount: any) => {
    const logos = {

    }

    return(<div className="flex flex-row w-full justify-between border border-themeBorderGrey mt-2 items-center py-1 px-2">
        <div className="flex flex-row items-center">
            <img src={`/${name}.svg`} className="w-8"></img>
            <div className="ml-2">{name}</div>
        </div>
        <div className="flex flex-row">{Number(amount) / 1e18} {name === "ETHEREUM"? "ETH" : name}</div>
    </div>)
}

const Account: NextPage = () => {
   const { address, isConnected } = useAccount();
   const [ depositAmount, setDepositAmount] = useState(0);
   const [ withdrawAmount, setWithdrawAmount] = useState(0);
   const [ selectedDepositToken = "USDC", setSelectedDepositToken] = useState("USDC");
   const [ selectedWithdrawToken = "USDC", setSelectedWithdrawToken] = useState("USDC");

   const WETHBalance = useContractRead({
        address: tokenAddresses["WETH"],
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });

    const USDCBalance = useContractRead({
        address: tokenAddresses["USDC"],
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });

    const DAIBalance = useContractRead({
        address: tokenAddresses["DAI"],
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });

    const L1EthRemoteCoreDeposit = useContractWrite({
        mode: "recklesslyUnprepared",
        address: contractAddresses["L1EthRemoteCore"],
        abi: L1EthRemoteCore.abi,
        functionName: "remoteDepositAccount",
        args: [tokenAddresses[selectedDepositToken], depositAmount],
    });

    const L1EthRemoteCoreWithdraw = useContractWrite({
        mode: "recklesslyUnprepared",
        address: contractAddresses["L1EthRemoteCore"],
        abi: L1EthRemoteCore.abi,
        functionName: "confirmRemoteWithdraw",
        args: [remoteTokenAddresses[selectedWithdrawToken], withdrawAmount],
    });

    const handleDropdownChange = (e: any) => {
        setSelectedDepositToken(e.target.value);
    }

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
        <div className="text-white max-w-7xl  flex flex-row w-full">
            <div className="w-full flex-col bg-themeDarkGrey p-5">
                <div className="text-lg">Virtual Deposits:</div>
                <select className="mt-3 bg-themeGreen w-full p-2.5 text-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Chain</option>
                        <option>Ethereum</option>
                        <option>Polygon</option>
                        <option>Arbitrum</option>
                        <option>Optimism</option>
                </select>
                    <div className="mt-6">
                        {renderToken("ETHEREUM", WETHBalance.data)}
                        {renderToken("USDC", USDCBalance.data)}
                        {renderToken("DAI", DAIBalance.data)}
                    </div>
                    <div className="mt-10">Virtual Deposit From Ethereum to Starknet</div>
                    <div className="relative w-full lg:max-w-sm mt-3">
                    <select onChange={(e) => handleDropdownChange(e)} className="bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Token</option>
                        <option>WETH</option>
                        <option>DAI</option>
                        <option>USDC</option>
                    </select>
                    <div className="mt-3">Enter Amount</div>
                    <input
                            type="number"
                            name="depositAmount"
                            id="price"
                            value={depositAmount}
                            className="mt-1 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // placeholder="0.00"
                            onChange={(event) => setDepositAmount(Number(event.target.value))}
                            />
                    <button className="mt-3 p-2 w-36 bg-themeGreen text-black" onClick={() => L1EthRemoteCoreDeposit.write()}>Deposit</button>
                </div>
            </div>
            <div className="w-full flex-col ml-20 bg-themeDarkGrey p-5">
                <div className="text-lg">Starknet Account Balances:</div>
                <div className="mt-6">
                    {renderToken("ETHEREUM", 10)}
                    {renderToken("USDC", 10)}
                    {renderToken("DAI", 10)}
                </div>
                <div className="mt-6">Virtual Deposit From Ethereum to Starknet</div>
                <div className="relative w-full lg:max-w-sm">
                <select className="mt-2 bg-themeGreen w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Chain</option>
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Arbitrum</option>
                    <option>Optimism</option>
                </select>
                <select className="mt-2 bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Token</option>
                    <option>WETH</option>
                    <option>DAI</option>
                    <option>USDC</option>
                </select>
                <div className="mt-3">Enter Amount</div>
                <input
                        type="number"
                        name="withdrawAmount"
                        id="price"
                        value={withdrawAmount}
                        className="mt-2 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        // placeholder="0.00"
                        onChange={(event) => setWithdrawAmount(Number(event.target.value))}
                        />
                <div>
                    <div className="mt-2">
                        <button className="mt-2 p-2 w-36 bg-themeOrange text-black">Start Process</button>
                        <button className="mt-2 p-2 w-36 bg-themeBlue text-black m-4">Finish Withdraw</button>
                    </div>
                </div>
            </div>
            </div>
    </div>
  </div>
  )
}

export default Account;
