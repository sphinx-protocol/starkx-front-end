import type { NextPage } from 'next'
import EIP712 from "../components/EIP712";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Stark X | Crosschain DEX</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <EIP712 />
        </main>

      </div>
  )
}

export default Home
