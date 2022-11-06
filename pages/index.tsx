// @ts-nocheck
import type { NextPage } from 'next'
import Link from "next/link";
import { useRouter } from 'next/router'
import Head from 'next/head'
import addresses from "contracts/deployments";
import { useAccount, useContractWrite } from 'wagmi';
import ERC20Fake from "contracts/abi/ERC20Fake.json"

const addTickerUSDC = async () => {
  const tokenAddress = addresses.L1USDC;
  const tokenSymbol = "USDC";
  const tokenDecimals = 18;
  const tokenImage = "";

  if (window.ethereum) {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window?.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
} 
};

const addTickerWETH = async () => {
  const tokenAddress = addresses.L1ETH;
  const tokenSymbol = "WETH";
  const tokenDecimals = 18;
  const tokenImage = "";

  if (window.ethereum) {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window?.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
} 
};


const Home: NextPage = () => {
  const { address } = useAccount()
  const getUSDCTokens = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: addresses.L1USDC,
    abi: ERC20Fake.abi,
    functionName: '_mint',
    args: [address, "1000000000000000000000"],
})

const getWETHTokens = useContractWrite({
  mode: 'recklesslyUnprepared',
  address: addresses.L1ETH,
  abi: ERC20Fake.abi,
  functionName: '_mint',
  args: [address, "1000000000000000000000"],
})

  return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Stark X | Crosschain DEX</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <div className="text-white text-lg">Welcome to the cross-chain DEX</div>
        <div className="text-white mt-10">To get started, switch to Gorli network and mint some fake ERC20s:</div>
            <div className="text-white flex flex-col items-center justify-center w-full mt-5">
              <div className="text-white">WETH Faucet:</div>
              <div className="flex flex-row">
                <button className="p-2 border border-black bg-themeBlue w-40" onClick={() => getWETHTokens.write()}>Mint</button> 
                <button className="p-2 border border-black bg-themePurple w-40 ml-3" onClick={() => addTickerWETH()}>Add to Metamask</button>
              </div>
              </div> 
              <div className="text-white flex flex-col items-center justify-center w-full mt-2">
              <div className="text-white">USDC Faucet:</div>
              <div className="flex flex-row">
                <button className="p-2 border border-black bg-themeBlue w-40" onClick={() => getUSDCTokens.write()}>Mint</button> 
                <button className="p-2 border border-black bg-themePurple w-40 ml-3" onClick={() => addTickerUSDC()}>Add to Metamask</button>
              </div>
              </div> 
          <div className="text-white mt-10">Go to Account to deposit funds from Ethereum to Starknet:</div>
          <div className="p-2 border border-black bg-themeGreen">
            <Link href="/account" className="ml-5">
              Go to Accounts
            </Link>
          </div>
          <div className="text-white mt-10">Go to Markets to trade on Starknet using Metamask:</div>
          <div className="p-2 border border-black bg-themeOrange">
            <Link href="/markets" className="ml-5">
              Go to Markets
            </Link>
          </div>
        </main>

      </div>
  )
}

export default Home
