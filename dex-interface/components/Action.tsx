import {useState} from "react";

export default function Action() {
    const [limitBuyPrice, setLimitBuyPrice] = useState(0);
    const [limitBuyAmount, setLimitBuyAmount] = useState(0);
    const [limitSellPrice, setLimitSellPrice] = useState(0);
    const [limitSellAmount, setLimitSellAmount] = useState(0);

    return (
        <div className="text-themeTextGrey flex flex-col w-full p-5">
           <div className="flex flex-row">
            <div className="text-themeOrange">Limit</div>
            <div className="ml-3">Market</div>
            <div className="ml-3">Stop-Limit</div>
           </div>
           <div className="flex flex-row w-full">
            <div className="flex flex-col w-full">
                <div className="w-full">
                    <div className="w-full justify-between flex flex-row">
                        <div>Balance</div>
                        <div>123,212 USDC</div>
                    </div>
                </div>
                <div className="flex flex-row border border-themeBorderGrey items-center mb-2 mt-2">
                    <input
                    type="number"
                    name="buyPrice"
                    id="price"
                    value={limitBuyPrice}
                    className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey rounded-md focus:bg-themeDarkGrey focus:border-themeDarkGrey sm:text-sm"
                    placeholder="0.00"
                    onChange={(event) => setLimitBuyPrice(Number(event.target.value))}
                    />
                    <div>Price</div>
                </div>
                <div className="flex flex-row border border-themeBorderGrey items-center mb-2">
                    <input
                    type="number"
                    name="buyAmount"
                    id="price"
                    value={limitBuyAmount}
                    className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey  rounded-md focus:ring-indigo-500 focus:border-themeDarkGrey sm:text-sm"
                    placeholder="0.00"
                    onChange={(event) => setLimitBuyAmount(Number(event.target.value))}
                    />
                    <div>Amount</div>
                </div>
                <button className="mt-2 bg-themeGreen text-black">Place Buy Order</button>
            </div>
            <div className="flex flex-col w-full ml-16">
                <div className="w-full">
                    <div className="w-full justify-between flex flex-row">
                        <div>Balance</div>
                        <div>35 ETH</div>
                    </div>
                </div>
                <div className="mt-2 flex flex-row border border-themeBorderGrey items-center mb-2">
                    <input
                    type="number"
                    name="sellPrice"
                    id="price"
                    value={limitSellPrice}
                    className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-themeDarkGrey sm:text-sm"
                    placeholder="0.00"
                    onChange={(event) => setLimitSellPrice(Number(event.target.value))}
                    />
                    <div>Price</div>
                </div>
                <div className="flex flex-row border border-themeBorderGrey items-center mb-2">
                    <input
                    type="number"
                    name="sellAmount"
                    id="price"
                    value={limitSellAmount}
                    className="block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border-themeBorderGrey rounded-md focus:bg-themeDarkGrey focus:border-themeDarkGrey sm:text-sm"
                    placeholder="0.00"
                    onChange={(event) => setLimitSellAmount(Number(event.target.value))}
                    />
                    <div>Amount</div>
                </div>
                <button className="mt-2 bg-themeRed text-black">Place Sell Order</button>
            </div>
           </div>
        </div>
    );
  }