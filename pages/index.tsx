import type { NextPage } from 'next'
import Link from "next/link";
import { useRouter } from 'next/router'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Stark X | Crosschain DEX</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        <div className="text-white text-lg">Welcome to the cross-chain DEX</div>
        <div className="text-white mt-10">To get started, switch to Gorli network and mint some fake ERC20s:</div>
            <div className="text-white flex flex-col items-center justify-center w-full">
              <div className="text-white">WETH Faucet:</div>
              <div className="flex flex-row">
                <button className="p-2 border border-black bg-themeBlue w-36">Mint</button> 
                <button className="p-2 border border-black bg-themePurple w-36">Add Ticker</button>
              </div>
              </div> 
              <div className="text-white flex flex-col items-center justify-center w-full">
              <div className="text-white">USDC Faucet:</div>
              <div className="flex flex-row">
                <button className="p-2 border border-black bg-themeBlue w-36">Mint</button> 
                <button className="p-2 border border-black bg-themePurple w-36">Add Ticker</button>
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
