import {useState, useEffect} from "react";
import { useSignTypedData, useAccount } from 'wagmi';

class SplitUint256 {
    low;
    high;
    constructor(low: any, high: any) {
        this.low = low;
        this.high = high;
    }
    toUint() {
        const uint = BigInt(this.low) + (BigInt(this.high) << BigInt(128));
        return uint;
    }
    static fromUint(uint: any) {
        const low = `0x${(uint & ((BigInt(1) << BigInt(128)) - BigInt(1))).toString(16)}`;
        const high = `0x${(uint >> BigInt(128)).toString(16)}`;
        return new SplitUint256(low, high);
    }
    static fromHex(hex: any) {
        return SplitUint256.fromUint(BigInt(hex));
    }
    toHex() {
        return `0x${this.toUint().toString(16)}`;
    }
    static fromObj(s: any) {
        return new SplitUint256(s.low, s.high);
    }
}

function getRSVFromSig(sig: any) {
    if (sig.startsWith('0x')) {
        sig = sig.substring(2);
    }
    const r = SplitUint256.fromHex('0x' + sig.substring(0, 64));
    const s = SplitUint256.fromHex('0x' + sig.substring(64, 64 * 2));
    const v = `0x${sig.substring(64 * 2)}`;
    return { r, s, v };
  }

export default function Action() {
    const { address, isConnected } = useAccount();
    const [ r, setR ] = useState<SplitUint256>();
    const [ s, setS ] = useState<SplitUint256>();
    const [ v, setV ] = useState("");

    const [limitBuyPrice, setLimitBuyPrice] = useState(0);
    const [limitBuyAmount, setLimitBuyAmount] = useState(0);
    const [limitSellPrice, setLimitSellPrice] = useState(0);
    const [limitSellAmount, setLimitSellAmount] = useState(0);

    const placeBuyOrder = useSignTypedData({
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
          authenticator: "0x01c9d8add6fbba9534ad3c623cc8ae3d18b0295a43c6feab83ea38614849db33",
          base_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b2f8",
          author: address, // author
          quote_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b233", // token address
          amount: limitBuyAmount,
          price: limitBuyPrice,
          strategy: 1,
          chainId: 5,
          orderId: 1,
          salt: '0x1',
        },
      })

      const placeSellOrder = useSignTypedData({
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
          authenticator: "0x01c9d8add6fbba9534ad3c623cc8ae3d18b0295a43c6feab83ea38614849db33",
          base_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b2f8",
          author: address, // author
          quote_asset: "0x06441c218ead27ee136579bad2c1705020e807f25d0b392e72b14e21b012b233", // token address
          amount: limitSellAmount,
          price: limitSellPrice,
          strategy: 2,
          chainId: 5,
          orderId: 1,
          salt: '0x1',
        },
      })
  
      useEffect(() => {
        if (placeBuyOrder.data || placeSellOrder.data) {
          const data = placeBuyOrder.data || placeSellOrder.data;
          const { r, s, v } = getRSVFromSig(placeBuyOrder.data);
          setR(r);
          setS(s);
          setV(v);
        }
      }, [placeBuyOrder.data, placeSellOrder.data])
  
      console.log(placeBuyOrder);

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
                    <div className="mr-2">Price</div>
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
                    <div className="mr-2">Amount</div>
                </div>
                <button className="mt-2 p-2 bg-themeGreen text-black" onClick={() => placeBuyOrder.signTypedData()}>Place Buy Order</button>
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
                    <div className="mr-2">Price</div>
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
                    <div className="mr-2">Amount</div>
                </div>
                <button className="mt-2 p-2 bg-themeRed text-black" onClick={() => placeSellOrder.signTypedData()}>Place Sell Order</button>
            </div>
           </div>
        </div>
    );
  }