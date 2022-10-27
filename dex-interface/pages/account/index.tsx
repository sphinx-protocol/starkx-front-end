import type { NextPage } from 'next'
import {useState} from "react";


const renderToken = (name, amount) => {
    const logos = {

    }

    return(<div className="flex flex-row w-full justify-between border border-themeBorderGrey mt-2 items-center py-1 px-2">
        <div className="flex flex-row items-center">
            <img src={`/${name}.svg`} className="w-8"></img>
            <div className="ml-2">{name}</div>
        </div>
        <div className="flex flex-row">10 {name === "ETHEREUM"? "ETH" : name}</div>
    </div>)
}

const Account: NextPage = () => {
   const [depositAmount, setDepositAmount] = useState(0);
   const [withdrawAmount, setWithdrawAmount] = useState(0);

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
        <div className="text-white max-w-7xl  flex flex-row w-full">
            <div className="w-full flex-col bg-themeDarkGrey p-5">
                <select className="bg-themeGreen w-full p-2.5 text-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Chain</option>
                        <option>Ethereum</option>
                        <option>Polygon</option>
                        <option>Arbitrum</option>
                        <option>Optimism</option>
                </select>
                    <div className="mt-10">
                        {renderToken("ETHEREUM", 10)}
                        {renderToken("USDC", 10)}
                        {renderToken("DAI", 10)}
                    </div>
                    <div className="mt-10">Virtual Deposit From Ethereum to Starknet</div>
                    <div className="relative w-full lg:max-w-sm">
                    <select className="bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Token</option>
                        <option>Ethereum</option>
                        <option>DAI</option>
                        <option>USDC</option>
                    </select>
                    <div>Enter Amount</div>
                    <input
                            type="number"
                            name="depositAmount"
                            id="price"
                            value={depositAmount}
                            className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="0.00"
                            onChange={(event) => setDepositAmount(Number(event.target.value))}
                            />
                    <button className="bg-themeGreen text-black">Deposit</button>
                </div>
            </div>
            <div className="w-full flex-col ml-20 bg-themeDarkGrey p-5">
                <div>Starknet Account Balances:</div>
                <div className="mt-10">
                    {renderToken("ETHEREUM", 10)}
                    {renderToken("USDC", 10)}
                    {renderToken("DAI", 10)}
                </div>
                <div>Virtual Deposit From Ethereum to Starknet</div>
                <div className="relative w-full lg:max-w-sm">
                <select className="mt-2 bg-themeGreen w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Chain</option>
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Arbitrum</option>
                    <option>Optimism</option>
                </select>
                <select className="mt-2 bg-themePurple w-full p-2.5 text-black bg-white rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Token</option>
                    <option>Ethereum</option>
                    <option>DAI</option>
                    <option>USDC</option>
                </select>
                <div>Enter Amount</div>
                <input
                        type="number"
                        name="withdrawAmount"
                        id="price"
                        value={withdrawAmount}
                        className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        onChange={(event) => setWithdrawAmount(Number(event.target.value))}
                        />
                <div>
                    <div className="mt-2">
                        <button className="bg-themeOrange text-black">Deposit</button>
                        <button className="bg-themeBlue text-black">Wtihdraw</button>
                    </div>
                </div>
            </div>
            </div>
    </div>
  </div>
  )
}

export default Account;
