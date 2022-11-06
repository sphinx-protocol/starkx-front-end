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

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="p-2 border border-black bg-themeBlue">
            <Link href="/markets" className="ml-5">
              Go to Markets
            </Link>
          </div>
        </main>

      </div>
  )
}

export default Home
