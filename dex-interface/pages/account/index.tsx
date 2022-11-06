import type { NextPage } from 'next'
import {useState} from "react";
import {Provider} from "starknet";
import { useContractRead, useContractWrite, useAccount, useSignTypedData } from 'wagmi'
import ERC20Fake from "../../abi/ERC20Fake.json";
import L1EthRemoteCore from "../../abi/L1EthRemoteCore.json";
import {getRSVFromSig, SplitUint256} from "../../utils/eip712";
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
    const starknetProvider = new Provider({
        sequencer: {
            // network: 'goerli-alpha',
            baseUrl: 'https://alpha4-2.starknet.io',
            feederGatewayUrl: 'feeder_gateway',
            gatewayUrl: 'gateway',
        },
    });

   const fetchUSDCBalance = async() => {
    const result = await starknetProvider.callContract({
        contractAddress:"0x0369651e6c1b3cc44095fd99fd9a7412f3460c31d459001df7070f710cd57ea4",
        entrypoint:"get_balance", 
        calldata:[
            "2093101717867572091314490980361936991870830399016763450328630046935729101720", // user address
            "1263837931181257672259478325023985688147725774594568537407549886638732743864", // token address
            "1"]
        });
    console.log("result", result);
    setDexUSDCBalance(Number(result.result[0]));
   }

   const fetchDAIBalance = async() => {
    const result = await starknetProvider.callContract({
        contractAddress:"0x0369651e6c1b3cc44095fd99fd9a7412f3460c31d459001df7070f710cd57ea4",
        entrypoint:"get_balance", 
        calldata:[
            "2093101717867572091314490980361936991870830399016763450328630046935729101720", // user address
            "123213", // token address
            "1"]
        });
    console.log("result", result);
    setDexDAIBalance(Number(result.result[0]));
   }

   const fetchWETHBalance = async() => {
    const result = await starknetProvider.callContract({
        contractAddress:"0x0369651e6c1b3cc44095fd99fd9a7412f3460c31d459001df7070f710cd57ea4",
        entrypoint:"get_balance", 
        calldata:[
            "2093101717867572091314490980361936991870830399016763450328630046935729101720", // user address
            "2576624706639232678191819241346448354159935221859968403121134970158245988074", // token address
            "1"]
        });
    console.log("result", result);
    setDexWETHBalance(Number(result.result[0]));
   }
    
   fetchUSDCBalance();
   fetchDAIBalance();
   fetchWETHBalance();

   const { address, isConnected } = useAccount();
   const [ depositAmount, setDepositAmount] = useState(0);
   const [ withdrawAmount, setWithdrawAmount] = useState(0);
   const [ dexUSDCBalance, setDexUSDCBalance] = useState(0);
   const [ dexDAIBalance, setDexDAIBalance] = useState(0);
   const [ dexWETHBalance, setDexWETHBalance] = useState(0);
   const [ selectedDepositToken = "USDC", setSelectedDepositToken] = useState("USDC");
   const [ selectedWithdrawToken = "USDC", setSelectedWithdrawToken] = useState("USDC");
   const [ r, setR ] = useState<SplitUint256>();
   const [ s, setS ] = useState<SplitUint256>();
   const [ v, setV ] = useState("");

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
          authenticator: "0x01c9d8add6fbba9534ad3c623cc8ae3d18b0295a43c6feab83ea38614849db33",
          base_asset: remoteTokenAddresses[selectedWithdrawToken],
          author: address, // author
          quote_asset: remoteTokenAddresses[selectedWithdrawToken], // token address
          amount: withdrawAmount,
          price: 0,
          strategy: 3,
          chainId: 5,
          orderId: 1,
          salt: '0x1',
        },
      })

    const handleDepositDropdownChange = (e: any) => {
        setSelectedDepositToken(e.target.value);
    }

    const handleWithdrawDropdownChange = (e: any) => {
        setSelectedWithdrawToken(e.target.value);
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
                    <select onChange={(e) => handleDepositDropdownChange(e)} className="bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
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
                <div className="text-lg">Starknet DEX Account Balances:</div>
                <div className="mt-6">
                    {renderToken("ETHEREUM", dexWETHBalance)}
                    {renderToken("USDC", dexUSDCBalance)}
                    {renderToken("DAI", dexDAIBalance)}
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
                <select onChange={(e) => handleWithdrawDropdownChange(e)} className="mt-2 bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
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
                        <button className="mt-2 p-2 w-36 bg-themeOrange text-black" onClick={() => startWithdraw.signTypedData()}>Start Process</button>
                        <button className="mt-2 p-2 w-36 bg-themeBlue text-black m-4" onClick={() => L1EthRemoteCoreWithdraw.write()}>Finish Withdraw</button>
                    </div>
                </div>
            </div>
            </div>
    </div>
  </div>
  )
}

export default Account;
