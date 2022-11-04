import {useState, useEffect} from "react";
import { useSignTypedData, useAccount } from 'wagmi';
import axios from "axios";
import {getRSVFromSig, SplitUint256} from "../utils/eip712";

export default function Action() {
    const { address, isConnected } = useAccount();
    const [ r, setR ] = useState<SplitUint256>();
    const [ s, setS ] = useState<SplitUint256>();
    const [ v, setV ] = useState("");
    const [ message, setMessage ] = useState({});

    const [limitBuyPrice, setLimitBuyPrice] = useState(0);
    const [limitBuyAmount, setLimitBuyAmount] = useState(0);
    const [limitSellPrice, setLimitSellPrice] = useState(0);
    const [limitSellAmount, setLimitSellAmount] = useState(0);

    const postRequest = () => {
        axios.post("/api/eip712", {
            r:r,
            s:s,
            v:v,
            message: message
        })
        .then((result) => {
            console.log("result", result);
        })
        .catch((err) => {
            console.log("error", err);
        })
    }

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
        if (placeBuyOrder.data) {
          const { r, s, v } = getRSVFromSig(placeBuyOrder.data);
          setR(r);
          setS(s);
          setV(v);
          setMessage({
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
          });
        } else if (placeSellOrder.data) {
          const { r, s, v } = getRSVFromSig(placeBuyOrder.data);
          setR(r);
          setS(s);
          setV(v);
          setMessage({
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
          });
        }
      }, [placeBuyOrder.data, placeSellOrder.data])

    useEffect(() => {
        postRequest();
    }, [message]);

    return (
        <div className="text-themeTextGrey flex flex-col w-full p-5">
        <button onClick={() => postRequest()}>Test</button>
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